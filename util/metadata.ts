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
      title: "PilotUP : Close more deals, without scaling headcount.",
      description: "PilotUP saves you months of execution by letting you create AI Employees that work together on your business goals and deliver human-quality results at a fraction of the cost of hiring.",
      canonicalUrl: SITE_URL,
      ogTitle: "PilotUP : Close more deals, without scaling headcount.",
      ogDescription: "PilotUP saves you months of execution by letting you create AI Employees that work together on your business goals and deliver human-quality results at a fraction of the cost of hiring.",
      ogImage: `${SITE_URL}/og-default.png`,
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
