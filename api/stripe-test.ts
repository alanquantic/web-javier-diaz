import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const account = await stripe.accounts.retrieve();
    return res.json({
      success: true,
      accountId: account.id,
      keyType: process.env.STRIPE_SECRET_KEY?.startsWith("sk_test")
        ? "test"
        : "live",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      keyType: process.env.STRIPE_SECRET_KEY?.startsWith("sk_test")
        ? "test"
        : "live",
    });
  }
}

