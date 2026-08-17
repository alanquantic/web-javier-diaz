import type { VercelRequest, VercelResponse } from "@vercel/node";
import { issueFormToken } from "../server/antiSpam";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ token: issueFormToken() });
}
