import assert from "node:assert/strict";
import test from "node:test";

process.env.FORM_SECRET = "test-secret-with-more-than-thirty-two-bytes-long";

const antiSpam = await import("./antiSpam");
const { default: contactHandler } = await import("../api/contact");
const { default: newsletterHandler } = await import("../api/newsletter");

function validToken() {
  const now = Date.now();
  return antiSpam.issueFormToken(now - antiSpam.MIN_FORM_AGE_MS - 100);
}

function validContact(overrides: Record<string, unknown> = {}) {
  return {
    name: "María López",
    email: `maria-${Math.random()}@example.com`,
    phone: "+52 449 186 6213",
    message: "Quiero recibir información sobre sus cursos.",
    company_website: "",
    formToken: validToken(),
    ...overrides,
  };
}

test("acepta un envío legítimo", () => {
  assert.deepEqual(antiSpam.screenSubmission(validContact(), "contact"), {
    valid: true,
  });
});

test("rechaza el honeypot lleno", () => {
  const result = antiSpam.screenSubmission(
    validContact({ company_website: "https://spam.example" }),
    "contact",
  );
  assert.equal(result.valid, false);
  if (!result.valid) assert.equal(result.reason, "honeypot");
});

test("rechaza tokens demasiado rápidos y vencidos", () => {
  const now = Date.now();
  const fast = antiSpam.verifyFormToken(antiSpam.issueFormToken(now), now);
  const expired = antiSpam.verifyFormToken(
    antiSpam.issueFormToken(now - antiSpam.MAX_FORM_AGE_MS - 1),
    now,
  );
  assert.equal(fast.valid, false);
  assert.equal(expired.valid, false);
});

test("rechaza fecha epoch, texto anómalo y correo desechable", () => {
  assert.equal(
    antiSpam.validateContactPayload(
      validContact({ appointmentDate: "1970-01-01" }),
    ).valid,
    false,
  );
  assert.equal(
    antiSpam.validateContactPayload(validContact({ name: "Brdxai" })).valid,
    false,
  );
  assert.equal(
    antiSpam.validateNewsletterPayload({
      name: "María López",
      email: "maria@mailinator.com",
    }).valid,
    false,
  );
});

test("limita a tres envíos por formulario e email en 24 horas", () => {
  const email = `rate-${Math.random()}@example.com`;
  for (let index = 0; index < 3; index += 1) {
    assert.equal(
      antiSpam.screenSubmission(validContact({ email }), "contact").valid,
      true,
    );
  }
  const fourth = antiSpam.screenSubmission(validContact({ email }), "contact");
  assert.equal(fourth.valid, false);
  if (!fourth.valid) assert.equal(fourth.reason, "rate limit excedido");
});

function mockResponse() {
  return {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    setHeader(key: string, value: string) {
      this.headers[key] = value;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };
}

test("los handlers silencian honeypots con HTTP 200 y cuerpo de éxito", async () => {
  const contactResponse = mockResponse();
  await contactHandler(
    {
      method: "POST",
      headers: {},
      body: validContact({ company_website: "spam.example" }),
    } as never,
    contactResponse as never,
  );
  assert.equal(contactResponse.statusCode, 200);
  assert.deepEqual(contactResponse.body, {
    message: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
  });

  const newsletterResponse = mockResponse();
  await newsletterHandler(
    {
      method: "POST",
      headers: {},
      body: {
        name: "María López",
        email: "maria@example.com",
        company_website: "spam.example",
        formToken: validToken(),
      },
    } as never,
    newsletterResponse as never,
  );
  assert.equal(newsletterResponse.statusCode, 200);
  assert.deepEqual(newsletterResponse.body, {
    message: "¡Gracias por suscribirte a nuestra newsletter!",
  });
});
