import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z, ZodError } from "zod";
import { insertCourseEnrollmentSchema } from "../shared/schema";
import { storage } from "../server/storage";
import {
  sendEmail,
  generateEnrollmentEmail,
} from "../server/emails";
import { sendPurchaseNotificationEmails } from "../server/purchaseNotification";
import {
  addEnrollmentToSheet,
  type EnrollmentData,
} from "../server/googleSheets";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const enrollmentData = insertCourseEnrollmentSchema
      .extend({
        paymentIntentId: z.string(),
      })
      .parse(req.body);

    const enrollment = await storage.createCourseEnrollment(enrollmentData);

    await storage.updatePaymentStatus(
      enrollment.id,
      "completed",
      enrollmentData.paymentIntentId,
    );

    const updatedEnrollment = await storage.getCourseEnrollment(enrollment.id);
    if (!updatedEnrollment) {
      throw new Error("Enrollment not found");
    }

    const sessions = [
      {
        date: "2 de octubre",
        title: "Módulo 1: Introducción a las ventas profesionales",
        time: "5:00 PM - 7:00 PM",
      },
      {
        date: "7 de octubre",
        title: "Módulo 1: Introducción a las ventas profesionales",
        time: "5:00 PM - 7:00 PM",
      },
      {
        date: "9 de octubre",
        title: "Módulo 1: La Imagen del Vendedor Profesional",
        time: "5:00 PM - 7:00 PM",
      },
      {
        date: "15 de octubre",
        title: "Módulo 1: Las mejores estrategias de los grandes vendedores",
        time: "5:00 PM - 7:00 PM",
      },
      {
        date: "16 de octubre",
        title: "Módulo 1: Retroalimentación",
        time: "5:00 PM - 6:00 PM",
      },
    ];

    const confirmationEmailHtml = generateEnrollmentEmail(
      enrollmentData.name,
      enrollmentData.courseName,
      updatedEnrollment.zoomLink,
      sessions,
    );

    try {
      await sendEmail({
        to: enrollmentData.email,
        subject:
          '🎉 ¡Gracias por tu inscripción al Curso Virtual "Escuela de Vendedores Profesionales"!',
        html: confirmationEmailHtml,
      });

      await sendPurchaseNotificationEmails({
        ...enrollmentData,
        zoomLink: updatedEnrollment.zoomLink,
        stripePaymentIntentId: updatedEnrollment.stripePaymentIntentId,
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    const sheetsData: EnrollmentData = {
      name: enrollmentData.name,
      email: enrollmentData.email,
      phone: enrollmentData.phone,
      company: enrollmentData.company || undefined,
      courseName: enrollmentData.courseName,
      coursePrice: enrollmentData.coursePrice / 100,
      paymentStatus: "Completado",
      createdAt: new Date().toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      await addEnrollmentToSheet(sheetsData);
      console.log("Enrollment data successfully added to Google Sheets");
    } catch (sheetsError) {
      console.error("Error adding data to Google Sheets:", sheetsError);
    }

    return res.status(201).json({
      message: "Pago procesado exitosamente",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error en los datos enviados",
        errors: error.errors,
      });
    }

    console.error("Error processing course payment:", error);
    return res.status(500).json({
      message: "Error al procesar el pago. Intente nuevamente más tarde.",
    });
  }
}

