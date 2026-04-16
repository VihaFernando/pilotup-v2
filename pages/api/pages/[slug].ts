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
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[seo] Failed to fetch page for slug "${String(req.query.slug)}":`, error);
    return res.status(500).json({ error: "Failed to fetch page SEO", message });
  }
}
