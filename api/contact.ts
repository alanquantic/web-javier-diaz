import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertContactSchema } from "../shared/schema";
import { ZodError } from "zod";
import { storage } from "../server/storage";
import { sendEmail } from "../server/emails";
import { checkBotId } from "botid/server";
import {
  logSpamRejection,
  screenSubmission,
} from "../server/antiSpam";

const SUCCESS_RESPONSE = {
  message: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const payload =
    req.body && typeof req.body === "object" ? req.body : {};

  try {
    const botResult = await checkBotId({
      advancedOptions: { headers: req.headers },
    });
    if (botResult.isBot) {
      logSpamRejection("BotID", payload);
      return res.status(200).json(SUCCESS_RESPONSE);
    }
  } catch (error) {
    console.warn("[anti-spam] checkBotId no disponible:", error);
  }

  const screening = screenSubmission(payload, "contact");
  if (!screening.valid) {
    logSpamRejection(screening.reason, payload);
    return res.status(200).json(SUCCESS_RESPONSE);
  }

  try {
    const contactData = insertContactSchema.parse({
      ...payload,
      phone: typeof payload.phone === "string" ? payload.phone : "",
    });
    await storage.createContact(contactData);

    try {
      const recipients = ["alan@ceosnm.com", "javier@javierdiaz.com.mx"];

      for (const recipient of recipients) {
        await sendEmail({
          to: recipient,
          subject: `Nuevo contacto: ${contactData.requestType || "Consulta general"}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Teléfono:</strong> ${contactData.phone || "No proporcionado"}</p>
            <p><strong>Empresa:</strong> ${contactData.company || "No especificada"}</p>
            <p><strong>Tipo de solicitud:</strong> ${contactData.requestType || "Consulta general"}</p>
            <p><strong>Método de contacto preferido:</strong> ${contactData.contactMethod || "No especificado"}</p>
            <p><strong>Fecha preferida para contacto:</strong> ${contactData.appointmentDate || "Sin fecha específica"}</p>
            <p><strong>Asunto:</strong> ${contactData.subject || "Sin asunto"}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${contactData.message || "Sin mensaje adicional"}</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    return res.status(200).json(SUCCESS_RESPONSE);
  } catch (error) {
    if (error instanceof ZodError) {
      logSpamRejection("esquema inválido", payload);
      return res.status(200).json(SUCCESS_RESPONSE);
    }

    console.error("Error processing contact:", error);
    return res.status(500).json({
      message: "Error al procesar la solicitud. Intente nuevamente más tarde.",
    });
  }
}

