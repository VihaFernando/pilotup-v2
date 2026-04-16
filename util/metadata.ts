import { Page } from "@/types";

const SITE_URL = "https://pilotup.io";
const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export type PageMeta = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  keywords: string;
};

export function generateOGImage(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_PUBLIC_URL}${url}`;
}

export function generatePageMeta(page?: Page): PageMeta {
  if (!page) {
    return {
      title: "PilotUP | AI SDR for Modern Revenue Teams",
      description: "PilotUP automates outreach, qualification, and handoff so your sales team books more meetings.",
      canonicalUrl: SITE_URL,
      ogTitle: "PilotUP",
      ogDescription: "AI-powered outbound platform for high-performing sales teams.",
      ogImage: `${SITE_URL}/og-default.png`,
      keywords: "sales automation, AI SDR, outbound, lead generation",
    };
  }

  const { attributes } = page;
  const isHome = attributes.slug === "home";
  return {
    title: attributes.ogTitle || attributes.title,
    description: attributes.ogDescription || attributes.description,
    canonicalUrl: attributes.canonicalUrl || (isHome ? `${SITE_URL}/` : `${SITE_URL}/${attributes.slug}`),
    ogTitle: attributes.ogTitle || attributes.title,
    ogDescription: attributes.ogDescription || attributes.description,
    ogImage: generateOGImage(attributes.ogImage?.data?.attributes?.url),
    keywords: (attributes.seoKeywords || []).join(", "),
  };
}
