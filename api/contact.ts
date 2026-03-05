import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertContactSchema } from "../shared/schema";
import { ZodError } from "zod";
import { storage } from "../server/storage";
import { sendEmail } from "../server/emails";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const contactData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(contactData);

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

    return res.status(201).json({
      message: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
      contact,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error en los datos enviados",
        errors: error.errors,
      });
    }

    console.error("Error processing contact:", error);
    return res.status(500).json({
      message: "Error al procesar la solicitud. Intente nuevamente más tarde.",
    });
  }
}

