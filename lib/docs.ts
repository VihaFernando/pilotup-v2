import { strapiFetch } from "@/lib/strapi";
import { strapiRichTextToHtml } from "@/lib/strapiRichText";
import { generateOGImage } from "@/util/metadata";
import type { APIResponse } from "@/types";

const SITE_URL = "https://pilotup.io";

export type StrapiDocView = {
  id: number;
  title: string;
  slug: string;
  category: string;
  order: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  ogTitle: string | null;
  ogDescription: string | null;
  /** Absolute image URL (after `generateOGImage`), for meta tags. */
  ogImageUrl: string | null;
  canonicalUrl: string | null;
};

type AnyObject = Record<string, unknown>;

function getFlat(raw: any): AnyObject {
  if (raw?.attributes && typeof raw.attributes === "object") {
    return { id: raw.id, ...(raw.attributes as AnyObject) };
  }
  return (raw as AnyObject) || {};
}

function asString(v: unknown): string | null {
  if (v == null) {
    return null;
  }
  const s = String(v);
  return s || null;
}

function parseKeywords(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map((k) => String(k)).filter(Boolean);
  }
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((k) => String(k)).filter(Boolean);
      }
    } catch {
      return v
        .split(/[,;]/)
        .map((k) => k.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function firstOgImageUrl(field: any): string | null {
  if (field == null) {
    return null;
  }
  if (typeof field === "string") {
    return field ? generateOGImage(field) ?? null : null;
  }
  const data = field.data ?? field;
  if (Array.isArray(data) && data.length > 0) {
    const u = data[0]?.attributes?.url ?? data[0]?.url;
    if (!u) {
      return null;
    }
    return generateOGImage(typeof u === "string" ? u : (u as { url?: string }).url) ?? null;
  }
  const u = data?.attributes?.url ?? data?.url;
  if (!u) {
    return null;
  }
  return generateOGImage(typeof u === "string" ? u : (u as { url?: string }).url) ?? null;
}

export function normalizeStrapiDoc(raw: any): StrapiDocView {
  const a = getFlat(raw) as any;
  const id = Number(a.id ?? raw?.id) || 0;
  const title = String(a.title ?? "");
  const slug = String(a.slug ?? "");
  const category = String(a.category ?? "general");
  const order = Number(a.order ?? 0) || 0;

  const ogRaw = a.ogImage ?? a.og_image;

  return {
    id,
    title,
    slug,
    category,
    order,
    seoTitle: asString(a.seo_title ?? a.seoTitle),
    seoDescription: asString(a.seo_description ?? a.seoDescription),
    seoKeywords: parseKeywords(a.seo_keywords ?? a.seoKeywords),
    ogTitle: asString(a.og_title ?? a.ogTitle),
    ogDescription: asString(a.og_description ?? a.ogDescription),
    ogImageUrl: firstOgImageUrl(ogRaw),
    canonicalUrl: asString(a.canonical_url ?? a.canonicalUrl),
  };
}

export type StrapiDocBundle = {
  view: StrapiDocView;
  content: unknown;
  raw: any;
};

/**
 * Fetches all published docs, sorted by order then title, with content for each entry.
 */
export async function fetchAllStrapiDocBundles(): Promise<StrapiDocBundle[]> {
  // Strapi collection `docs` → REST plural `/api/docs` (adjust if your API id differs).
  const path =
    "/api/docs?pagination[pageSize]=200&sort[0]=order:asc&sort[1]=title:asc&populate=*";
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const list = (data.data ?? []) as any[];
  return list.map((raw) => {
    const view = normalizeStrapiDoc(raw);
    const content = (getFlat(raw) as { content?: unknown }).content;
    return { view, content, raw };
  });
}

/**
 * Group docs for sidebar: categories by minimum order, links sorted by order.
 */
export function humanizeDocCategory(category: string): string {
  const s = category.replace(/_/g, " ").toLowerCase();
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function groupDocsForSidebar(views: StrapiDocView[]): { title: string; links: { label: string; slug: string }[] }[] {
  const byCat = new Map<string, StrapiDocView[]>();
  for (const d of views) {
    const key = d.category || "general";
    if (!byCat.has(key)) {
      byCat.set(key, []);
    }
    byCat.get(key)!.push(d);
  }

  const entries = Array.from(byCat.entries()).map(([cat, items]) => {
    const sorted = [...items].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
    const minOrder = Math.min(...sorted.map((d) => d.order));
    return { cat, minOrder, sorted, title: humanizeDocCategory(cat) };
  });

  entries.sort((a, b) => a.minOrder - b.minOrder || a.title.localeCompare(b.title));

  return entries.map((e) => ({
    title: e.title,
    links: e.sorted.map((d) => ({ label: d.title, slug: d.slug })),
  }));
}

export function plainTextExcerptFromHtml(html: string, max = 200): string {
  const t = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (t.length <= max) {
    return t;
  }
  return `${t.slice(0, max).trimEnd()}…`;
}

export type DocSpotlightItem = {
  label: string;
  slug: string;
  description: string;
};

/**
 * Builds search spotlight rows: prefers SEO/OG description, else plain excerpt from body.
 */
export function buildDocSpotlightItems(bundles: StrapiDocBundle[]): DocSpotlightItem[] {
  return bundles.map((b) => {
    const view = b.view;
    const rawHtml = strapiRichTextToHtml(b.content);
    const fromContent = plainTextExcerptFromHtml(rawHtml, 240);
    const desc =
      (view.seoDescription && view.seoDescription.trim()) ||
      (view.ogDescription && view.ogDescription.trim()) ||
      fromContent;
    return {
      label: view.title,
      slug: view.slug,
      description: desc,
    };
  });
}

export function buildDocPageSeo(
  doc: StrapiDocView,
  defaultDescription: string
): {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
} {
  const path = `${SITE_URL}/docs/${doc.slug}`;
  const title = doc.seoTitle || doc.ogTitle || doc.title;
  const description = doc.seoDescription || doc.ogDescription || defaultDescription;
  const ogTitle = doc.ogTitle || title;
  const ogDescription = doc.ogDescription || description;
  const ogImage = doc.ogImageUrl || `${SITE_URL}/og-default.png`;
  const keywords = (doc.seoKeywords.length ? doc.seoKeywords : []).join(", ");
  const canonicalUrl = doc.canonicalUrl && doc.canonicalUrl.startsWith("http") ? doc.canonicalUrl : path;
  return {
    title,
    description: description.slice(0, 160),
    keywords,
    ogTitle: ogTitle.slice(0, 65),
    ogDescription: ogDescription.slice(0, 155),
    ogImage: ogImage || `${SITE_URL}/og-default.png`,
    canonicalUrl,
  };
}
