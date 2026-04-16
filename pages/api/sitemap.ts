import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllPages } from "@/lib/strapi";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const pages = await fetchAllPages();
    const urls = ["", ...pages.map((page) => page.attributes.slug)];
    const now = new Date().toISOString();
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (slug) => `<url>
  <loc>https://pilotup.io/${slug}</loc>
  <lastmod>${now}</lastmod>
  <priority>${slug ? "0.8" : "1.0"}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch {
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}
