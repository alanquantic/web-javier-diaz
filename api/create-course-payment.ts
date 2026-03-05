import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertCourseEnrollmentSchema } from "../shared/schema";
import { ZodError } from "zod";
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const enrollmentData = insertCourseEnrollmentSchema.parse(req.body);

    const enrollment = await storage.createCourseEnrollment(enrollmentData);

    return res.status(201).json({
      message: "Enrollment created, awaiting payment",
      enrollment,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error en los datos enviados",
        errors: error.errors,
      });
    }

    console.error("Error creating enrollment:", error);
    return res.status(500).json({
      message: "Error al crear la inscripción.",
    });
  }
}

