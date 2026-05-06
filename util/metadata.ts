import { Page } from "@/types";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/util/seo";

const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export type PageMeta = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  keywords: string;
  robots: string;
  viewport?: string;
  ogType: string;
  ogUrl: string;
  structuredData: unknown[];
};

export function generateOGImage(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_PUBLIC_URL}${url}`;
}

function firstMediaUrl(mediaField: unknown): string | undefined {
  if (!mediaField || typeof mediaField !== "object") return undefined;
  const source = mediaField as {
    data?:
      | { attributes?: { url?: string }; url?: string }
      | Array<{ attributes?: { url?: string }; url?: string }>;
    attributes?: { url?: string };
    url?: string;
  };
  const data = source.data ?? source;
  if (Array.isArray(data)) {
    const first = data[0];
    return first?.attributes?.url || first?.url;
  }
  return data?.attributes?.url || data?.url;
}

function asString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizeKeywords(value: unknown): string {
  if (Array.isArray(value)) {
    return value
      .map((item) => asString(item))
      .filter((item): item is string => Boolean(item))
      .join(", ");
  }
  const raw = asString(value);
  if (!raw) return "";
  if (raw.startsWith("[") && raw.endsWith("]")) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => asString(item))
          .filter((item): item is string => Boolean(item))
          .join(", ");
      }
    } catch {
      // Fallback to plain text.
    }
  }
  return raw
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");
}

function normalizeStructuredData(value: unknown): unknown[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return [value];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === "object") return [parsed];
    } catch {
      return [];
    }
  }
  return [];
}

export function generatePageMeta(page?: Page): PageMeta {
  if (!page) {
    return {
      title: "PilotUP : Close more deals, without scaling headcount.",
      description: "PilotUP saves you months of execution by letting you create AI Employees that work together on your business goals and deliver human-quality results at a fraction of the cost of hiring.",
      canonicalUrl: SITE_URL,
      ogTitle: "PilotUP : Close more deals, without scaling headcount.",
      ogDescription: "PilotUP saves you months of execution by letting you create AI Employees that work together on your business goals and deliver human-quality results at a fraction of the cost of hiring.",
      ogImage: DEFAULT_OG_IMAGE,
      keywords: [
        "AI SDR",
        "AI Employees",
        "Autonomous AI agents",
        "AI platform",
        "Revenue teams",
        "Modern revenue teams",
        "Close more deals without scaling headcount",
        "AI employees that work 24/7",
        "Human-quality results at a fraction of the cost",
        "Build teams of AI employees",
        "Hire your first AI employee",
        "AI employee for sales and growth",
        "Automate complex tasks with autonomous AI agents",
        "Real-time communication",
        "Business context ingestion",
        "Outreach automation",
        "Follow-up automation",
        "Pipeline management",
        "Deal velocity",
        "Prospecting automation",
        "Content automation",
        "Lifecycle campaigns",
        "Back-office workflows",
        "Customer success at scale",
        "Ticket management",
        "Internal coordination",
        "Bank-grade encryption",
        "Data isolation",
        "Sales Lead",
        "Growth and Content Lead",
        "Support Lead",
        "Operations Manager",
        "Sales employee",
        "Marketing employee",
        "Support employee",
        "Research employee",
        "No hiring cycles",
        "No training time",
        "Scale without headcount",
        "Consistent execution",
        "24/7 availability",
        "No downtime",
        "Results from day one",
        "Hire experts pay intern rates",
        "Works around the clock",
        "Team that never sleeps",
        "Founders",
        "Startups",
        "Enterprise",
        "Revenue teams",
        "Business owners",
        "Sales teams",
        "Growth teams",
        "Slack integration",
        "Gmail integration",
        "WhatsApp integration",
        "HubSpot integration",
        "Notion integration",
        "Figma integration",
        "Jira integration",
        "Discord integration",
        "Telegram integration",
        "Google Meet integration",
        "ClickUp integration",
        "Microsoft Teams",
        "Webex",
        "Bank-grade encryption",
        "Data isolation",
        "Enterprise secure",
        "Proprietary data security",
        "Join Waitlist",
        "Early Access",
        "Get Started Free",
        "No credit card required",
        "Watch Demo",
        "Talk to Founders"
      ].join(", "),
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      viewport: undefined,
      ogType: "website",
      ogUrl: SITE_URL,
      structuredData: [],
    };
  }

  const { attributes } = page;
  const isHome = attributes.slug === "home";
  const seo = attributes.seo ?? {};
  const openGraph = seo.openGraph ?? {};
  const canonicalUrl = asString(seo.canonicalURL) || attributes.canonicalUrl || (isHome ? `${SITE_URL}/` : `${SITE_URL}/${attributes.slug}`);
  const title = asString(seo.metaTitle) || attributes.ogTitle || attributes.title;
  const description = asString(seo.metaDescription) || attributes.ogDescription || attributes.description;
  const ogImage =
    generateOGImage(firstMediaUrl(openGraph.ogImage)) ||
    generateOGImage(firstMediaUrl(seo.metaImage)) ||
    generateOGImage(attributes.ogImage?.data?.attributes?.url) ||
    DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: asString(openGraph.ogTitle) || attributes.ogTitle || title,
    ogDescription: asString(openGraph.ogDescription) || attributes.ogDescription || description,
    ogImage,
    keywords: normalizeKeywords(seo.keywords) || normalizeKeywords(attributes.seoKeywords),
    robots: asString(seo.metaRobots) || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    viewport: asString(seo.metaViewport),
    ogType: asString(openGraph.ogType) || "website",
    ogUrl: asString(openGraph.ogUrl) || canonicalUrl,
    structuredData: normalizeStructuredData(seo.structuredData),
  };
}
