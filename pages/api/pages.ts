import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllPages } from "@/lib/strapi";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const pages = await fetchAllPages();
    return res.status(200).json(pages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: "Failed to fetch pages", message });
  }
}
