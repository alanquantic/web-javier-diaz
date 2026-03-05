import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { courseName, originalPrice } = req.body as {
      courseName: string;
      originalPrice: number;
    };

    if (courseName !== "Escuela de Vendedores Profesionales") {
      return res.json({
        discountAvailable: false,
        originalPrice,
        finalPrice: originalPrice,
        discountAmount: 0,
        discountPercentage: 0,
        remainingSpots: 0,
      });
    }

    const completedWithDiscount =
      await storage.getCompletedEnrollmentsWithDiscount(courseName);
    const maxDiscountSpots = 50;
    const remainingSpots = Math.max(0, maxDiscountSpots - completedWithDiscount);
    const discountAvailable = remainingSpots > 0;

    if (!discountAvailable) {
      return res.json({
        discountAvailable: false,
        originalPrice,
        finalPrice: originalPrice,
        discountAmount: 0,
        discountPercentage: 0,
        remainingSpots: 0,
      });
    }

    const discountAmount = 50;
    const finalPrice = Math.max(0, originalPrice - discountAmount);
    const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

    return res.json({
      discountAvailable: true,
      originalPrice,
      finalPrice,
      discountAmount,
      discountPercentage,
      remainingSpots,
    });
  } catch (error: any) {
    console.error("Error checking discount:", error);
    return res.status(500).json({
      message: "Error checking discount availability: " + error.message,
    });
  }
}

