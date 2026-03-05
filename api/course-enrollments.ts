import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const enrollments = await storage.getAllCourseEnrollments();
    return res.json(enrollments);
  } catch (error) {
    console.error("Error fetching course enrollments:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener las inscripciones" });
  }
}

