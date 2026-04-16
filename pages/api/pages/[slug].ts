import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPageBySlug } from "@/lib/strapi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slug = req.query.slug;
    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const page = await fetchPageBySlug(slug);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    return res.status(200).json(page);
  } catch (error) {
    // Strapi can be unavailable in local/dev; return a neutral payload so the app can
    // gracefully fall back to static metadata without noisy 500s.
    return res.status(200).json(null);
  }
}
