import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertNewsletterSchema } from "../shared/schema";
import { ZodError } from "zod";
import { storage } from "../server/storage";
import { sendEmail } from "../server/emails";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const newsletterData = insertNewsletterSchema.parse(req.body);

    const existingSubscription = await storage.getNewsletterByEmail(
      newsletterData.email,
    );

    if (existingSubscription) {
      return res.status(200).json({
        message: "¡Ya estás suscrito a nuestra newsletter!",
        subscription: existingSubscription,
      });
    }

    const subscription = await storage.createNewsletter(newsletterData);

    try {
      await sendEmail({
        to: newsletterData.email,
        subject: "Bienvenido a la newsletter de Javier Díaz",
        html: `
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Bienvenido a nuestra comunidad</title>
              <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: white; padding: 30px; border: 1px solid #e5e7eb; color: #333; }
                  .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <div style="margin-bottom: 20px;">
                          <img src="${
                            process.env.NODE_ENV === "production"
                              ? "https://your-domain.com"
                              : "http://localhost:5000"
                          }/javier-diaz-logo.png" alt="Javier Díaz" style="max-width: 250px; height: auto;" />
                      </div>
                      <h2>¡Bienvenido a nuestra comunidad!</h2>
                  </div>
                  
                  <div class="content">
                      <p>Hola ${newsletterData.name},</p>
                      <p>Gracias por suscribirte a nuestra newsletter. Recibirás contenido exclusivo sobre ventas, liderazgo y crecimiento personal.</p>
                      <p>¡Prepárate para multiplicar tus ventas y liderar tu vida!</p>
                      <br>
                      <p>Saludos,</p>
                      <p><strong>Javier Díaz</strong><br>
                      <em>Fundador - Escuela de Vendedores Profesionales</em></p>
                  </div>
                  
                  <div class="footer">
                      <p>© 2025 Escuela de Vendedores Profesionales. Todos los derechos reservados.</p>
                  </div>
              </div>
          </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
    }

    return res.status(201).json({
      message: "¡Gracias por suscribirte a nuestra newsletter!",
      subscription,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error en los datos enviados",
        errors: error.errors,
      });
    }

    console.error("Error processing newsletter subscription:", error);
    return res.status(500).json({
      message: "Error al procesar la suscripción. Intente nuevamente más tarde.",
    });
  }
}

