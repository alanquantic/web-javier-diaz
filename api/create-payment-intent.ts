import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { storage } from "../server/storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { amount, courseName, discountApplied } = req.body as {
      amount: number;
      courseName?: string;
      discountApplied?: boolean;
    };

    console.log("Creating payment intent for:", {
      amount,
      courseName,
      discountApplied,
    });
    console.log(
      "Stripe key starts with:",
      process.env.STRIPE_SECRET_KEY?.substring(0, 8),
    );

    const paymentIntentParams: any = {
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        courseName: courseName || "Escuela de Vendedores Profesionales",
        discountApplied: discountApplied ? "true" : "false",
      },
    };

    if (courseName === "Escuela de Vendedores Profesionales" && discountApplied) {
      const completedWithDiscount =
        await storage.getCompletedEnrollmentsWithDiscount(courseName);
      if (completedWithDiscount >= 50) {
        console.log("Discount no longer available - reached 50 limit");
        return res
          .status(400)
          .json({ message: "Discount no longer available. Please refresh and try again." });
      }
      console.log(
        "Processing payment with $50 discount applied to final amount",
      );
      paymentIntentParams.metadata.couponApplied = "KEnrA857";
      paymentIntentParams.metadata.discountAmount = "50";
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    console.log("Payment intent created:", paymentIntent.id);
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      message: "Error creating payment intent: " + error.message,
    });
  }
}

