import { withHeadingIdsAndToc, type DocTocItem } from "@/lib/docHeadings";
import { strapiFetch } from "@/lib/strapi";
import { sanitizeBlogHtml } from "@/lib/sanitizeBlogHtml";
import type { APIResponse } from "@/types";

type AnyObject = Record<string, unknown>;

function getFlat(raw: { id?: number | string; attributes?: AnyObject } & AnyObject): AnyObject {
  if (raw?.attributes && typeof raw.attributes === "object") {
    return { id: raw.id, ...(raw.attributes as AnyObject) };
  }
  return (raw as AnyObject) || {};
}

/** TinyMCE / long text — string or Strapi block with `body` */
function pageRichTextToHtml(flat: AnyObject): string {
  const n =
    flat.content ??
    flat.body ??
    flat.termsContent ??
    flat.privacyContent ??
    flat.legalContent ??
    flat.richText ??
    null;
  if (typeof n === "string") {
    return n;
  }
  if (n && typeof n === "object" && "body" in n && typeof (n as { body?: string }).body === "string") {
    return (n as { body: string }).body;
  }
  return "";
}

function formatLastUpdated(value: unknown): string {
  if (typeof value !== "string" || !value) {
    return "";
  }
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      return "";
    }
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export type StrapiRichPageView = {
  title: string;
  metaDescription: string;
  lastUpdated: string;
  html: string;
  toc: DocTocItem[];
};

/**
 * Loads a Strapi `pages` entry by slug and returns sanitized main rich text (TinyMCE).
 * Ensure the Page type includes a long-text / rich field (e.g. `content`).
 */
export async function fetchStrapiPageRichBySlug(slug: string): Promise<StrapiRichPageView | null> {
  const encoded = encodeURIComponent(slug);
  const path = `/api/pages?filters[slug][$eq]=${encoded}&populate=*`;
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const first = (data.data ?? [])[0] as { id?: number | string; attributes?: AnyObject } & AnyObject | undefined;
  if (!first) {
    return null;
  }
  const flat = getFlat(first);
  const rawHtml = pageRichTextToHtml(flat);
  if (!rawHtml.trim()) {
    return null;
  }
  const title = String(flat.title ?? "").trim() || slug;
  const metaDescription = String(
    flat.description ?? flat.seo_description ?? flat.seoDescription ?? "",
  ).trim();
  const lastUpdated =
    formatLastUpdated(flat.updatedAt) ||
    formatLastUpdated(flat.publishedAt) ||
    formatLastUpdated(flat.createdAt) ||
    "";

  const sanitized = sanitizeBlogHtml(rawHtml);
  const { html, toc } = withHeadingIdsAndToc(sanitized);

  return {
    title,
    metaDescription: metaDescription || `Read ${title} for PilotUP.`,
    lastUpdated: lastUpdated || "—",
    html,
    toc,
  };
}
