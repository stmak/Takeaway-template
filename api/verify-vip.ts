import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.body as { code?: string };

    if (!code || typeof code !== "string") {
      return res.status(400).json({ valid: false, error: "Invalid code" });
    }

    const trimmedCode = code.trim();
    const validCode = process.env.VIP_CODE;

    if (!validCode) {
      return res.status(500).json({ valid: false, error: "VIP code not configured on server" });
    }

    if (trimmedCode === validCode) {
      return res.status(200).json({ valid: true });
    }

    return res.status(200).json({ valid: false });
  } catch {
    return res.status(500).json({ valid: false, error: "Internal server error" });
  }
}