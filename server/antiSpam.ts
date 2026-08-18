import crypto from "node:crypto";

export const HONEYPOT_FIELD = "company_website";
export const MIN_FORM_AGE_MS = 3_000;
export const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1_000;

const FORM_SECRET = process.env.FORM_SECRET ?? "";
const VOWEL = /[aeiouáéíóúü]/i;
const CONSONANT_RUN = /[bcdfghjklmnpqrstvwxyzñ]{4,}/i;
const URL_OR_HTML = /https?:\/\/|\[url=|<a\s+href|<[a-z][^>]*>/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DISPOSABLE_EMAIL_PARTS = [
  "mailinator.com",
  "tempmail",
  "guerrillamail",
  "10minutemail",
  "yopmail",
  "throwaway",
];

type Payload = Record<string, unknown>;
type ValidationResult = { valid: true } | { valid: false; reason: string };

const hits = new Map<string, number[]>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1_000;

function sign(value: string): string {
  return crypto.createHmac("sha256", FORM_SECRET).update(value).digest("hex");
}

export function issueFormToken(now = Date.now()): string {
  if (!FORM_SECRET) return `${now}.unsigned`;
  return `${now}.${sign(String(now))}`;
}

export function verifyFormToken(token: unknown, now = Date.now()): ValidationResult {
  if (!FORM_SECRET) return { valid: true };
  if (typeof token !== "string" || !token.includes(".")) {
    return { valid: false, reason: "token ausente o malformado" };
  }

  const [timestampString, signature] = token.split(".");
  const timestamp = Number(timestampString);
  if (!Number.isFinite(timestamp) || !signature) {
    return { valid: false, reason: "token malformado" };
  }

  const expected = sign(timestampString);
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return { valid: false, reason: "firma inválida" };
  }

  const age = now - timestamp;
  if (age < MIN_FORM_AGE_MS) {
    return { valid: false, reason: `demasiado rápido (${age}ms)` };
  }
  if (age > MAX_FORM_AGE_MS) {
    return { valid: false, reason: "token vencido" };
  }
  return { valid: true };
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function hasAnomalousUppercase(value: string): boolean {
  const isLetter = (character: string) =>
    /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(character);
  const letters = Array.from(value).filter(isLetter);
  if (!letters.length) return false;

  const hasLowercase = letters.some(
    (character) =>
      character === character.toLowerCase() &&
      character !== character.toUpperCase(),
  );
  if (!hasLowercase) return false;

  let interiorUppercase = 0;
  for (const word of value.split(/\s+/).filter(Boolean)) {
    let foundFirstLetter = false;
    for (const character of Array.from(word)) {
      if (!isLetter(character)) continue;
      const isUppercase =
        character === character.toUpperCase() &&
        character !== character.toLowerCase();
      if (!foundFirstLetter) foundFirstLetter = true;
      else if (isUppercase) interiorUppercase += 1;
    }
  }
  return interiorUppercase / letters.length > 0.3;
}

function checkText(field: string, raw: string): string | null {
  const value = raw.trim();
  if (value.length < 2 || value.length > 100) return `${field}: longitud`;
  if (!VOWEL.test(value)) return `${field}: sin vocales`;
  if (CONSONANT_RUN.test(value)) return `${field}: 4+ consonantes`;
  if (hasAnomalousUppercase(value)) return `${field}: mayúsculas anómalas`;
  if (URL_OR_HTML.test(value)) return `${field}: URL/HTML`;
  return null;
}

function checkEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return "email: formato";
  if (DISPOSABLE_EMAIL_PARTS.some((part) => email.includes(part))) {
    return "email: dominio desechable";
  }
  return null;
}

function checkPhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-().+]/g, "");
  if (!/^\d{10,15}$/.test(digits)) return "teléfono: longitud";
  if (/^(\d)\1+$/.test(digits)) return "teléfono: dígitos iguales";
  if (digits === "1234567890" || digits === "0987654321") {
    return "teléfono: secuencia obvia";
  }
  return null;
}

function checkDate(raw: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
  if (!match) return "fecha: formato";
  if (Number(match[1]) < 2000) return "fecha: anterior a 2000 (epoch)";

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const target = Date.UTC(year, month - 1, day);
  const parsed = new Date(target);
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return "fecha: inválida";
  }

  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const dayInMilliseconds = 86_400_000;
  if (target < today - dayInMilliseconds) return "fecha: en el pasado";
  if (
    target >=
    Date.UTC(
      now.getUTCFullYear() + 3,
      now.getUTCMonth(),
      now.getUTCDate(),
    )
  ) {
    return "fecha: muy lejana";
  }
  return null;
}

function checkFreeText(field: string, raw: string): string | null {
  if (raw.length > 2_000) return `${field}: muy largo`;
  const urls = (raw.match(/https?:\/\/|www\./gi) ?? []).length;
  const tags = (raw.match(/<[^>]+>|\[[^\]]+\]/g) ?? []).length;
  return urls + tags > 2 ? `${field}: demasiados enlaces` : null;
}

export function validateContactPayload(payload: Payload): ValidationResult {
  const optionalStringFields = [
    "phone",
    "company",
    "subject",
    "message",
    "appointmentDate",
    "contactMethod",
    "requestType",
  ];
  for (const field of optionalStringFields) {
    const value = payload[field];
    if (value !== undefined && value !== null && typeof value !== "string") {
      return { valid: false, reason: `${field}: tipo inválido` };
    }
  }

  const name = stringValue(payload.name);
  const email = stringValue(payload.email);
  const phone = stringValue(payload.phone);
  const company = stringValue(payload.company);
  const subject = stringValue(payload.subject);
  const message = stringValue(payload.message);
  const appointmentDate = stringValue(payload.appointmentDate);
  const contactMethod = stringValue(payload.contactMethod);
  const requestType = stringValue(payload.requestType);

  const reason =
    checkText("nombre", name) ||
    checkEmail(email) ||
    (phone ? checkPhone(phone) : null) ||
    (company ? checkText("empresa", company) : null) ||
    (appointmentDate ? checkDate(appointmentDate) : null) ||
    (contactMethod &&
    !["whatsapp", "zoom", "phone", "email"].includes(contactMethod)
      ? "método de contacto: inválido"
      : null) ||
    (requestType && !["info", "question", "download"].includes(requestType)
      ? "tipo de solicitud: inválido"
      : null) ||
    (subject ? checkFreeText("asunto", subject) : null) ||
    (message ? checkFreeText("mensaje", message) : null);

  return reason ? { valid: false, reason } : { valid: true };
}

export function validateNewsletterPayload(payload: Payload): ValidationResult {
  const reason =
    checkText("nombre", stringValue(payload.name)) ||
    checkEmail(stringValue(payload.email));
  return reason ? { valid: false, reason } : { valid: true };
}

export function rateLimit(key: string): ValidationResult {
  const normalizedKey = key.trim().toLowerCase();
  if (!normalizedKey) return { valid: true };

  const now = Date.now();
  const recent = (hits.get(normalizedKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(normalizedKey, recent);
    return { valid: false, reason: "rate limit excedido" };
  }
  recent.push(now);
  hits.set(normalizedKey, recent);
  return { valid: true };
}

export function screenSubmission(
  payload: Payload,
  kind: "contact" | "newsletter",
): ValidationResult {
  if (stringValue(payload[HONEYPOT_FIELD]).trim()) {
    return { valid: false, reason: "honeypot" };
  }

  const tokenResult = verifyFormToken(payload.formToken);
  if (!tokenResult.valid) return tokenResult;

  const validationResult =
    kind === "contact"
      ? validateContactPayload(payload)
      : validateNewsletterPayload(payload);
  if (!validationResult.valid) return validationResult;

  return rateLimit(`${kind}:${stringValue(payload.email)}`);
}

export function logSpamRejection(reason: string, payload: unknown): void {
  console.warn(`[anti-spam] Descartado: ${reason}`, { payload });
}
