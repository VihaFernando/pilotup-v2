import { strapiFetch } from "@/lib/strapi";
import { resolveStrapiAsset } from "@/lib/blog";
import { sanitizeBlogHtml } from "@/lib/sanitizeBlogHtml";
import type { APIResponse } from "@/types";
import type { CareerJob, CareerJobListItem } from "@/lib/careers";

const CAREERS_PATH = process.env.NEXT_PUBLIC_STRAPI_CAREERS_PATH || "/api/careers";

type AnyObject = Record<string, unknown>;

function getFlat(raw: { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject): AnyObject {
  if (raw?.attributes && typeof raw.attributes === "object") {
    return { id: raw.id, documentId: raw.documentId, ...(raw.attributes as AnyObject) };
  }
  return (raw as AnyObject) || {};
}

function toIsoDateOnly(value: unknown): string {
  if (typeof value !== "string" || !value) {
    return new Date().toISOString().slice(0, 10);
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return value.slice(0, 10) || new Date().toISOString().slice(0, 10);
  }
  return d.toISOString().slice(0, 10);
}

function firstOgImageUrl(raw: AnyObject): string | null {
  const m =
    raw.og_image ?? raw.ogImage ?? null;
  if (!m) {
    return null;
  }
  if (typeof m === "string") {
    return resolveStrapiAsset(m) || null;
  }
  const data = (m as { data?: unknown }).data ?? m;
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0] as { attributes?: { url?: string }; url?: string };
    const u = first?.attributes?.url ?? first?.url;
    return u ? resolveStrapiAsset(u) || null : null;
  }
  const o = data as { attributes?: { url?: string }; url?: string } | null;
  const u = o?.attributes?.url ?? o?.url;
  return u ? resolveStrapiAsset(u) || null : null;
}

/** TinyMCE or custom long text — string or { body } */
function jobDescriptionToHtml(flat: AnyObject): string {
  const n =
    flat.job_description_content ??
    flat.job_desription_content ??
    flat.jobDescriptionContent ??
    null;
  if (typeof n === "string") {
    return n;
  }
  if (n && typeof n === "object" && "body" in n && typeof (n as { body?: string }).body === "string") {
    return (n as { body: string }).body;
  }
  return "";
}

function str(v: unknown): string {
  return v === undefined || v === null ? "" : String(v).trim();
}

function mapToListItem(flat: AnyObject, raw: { id?: number | string; documentId?: string } & AnyObject): CareerJobListItem | null {
  const slug = str(flat.slug);
  const title = str(flat.title);
  if (!slug || !title) {
    return null;
  }
  const posted =
    flat.posted ?? flat.publishedAt ?? flat.createdAt ?? flat.updatedAt;
  return {
    slug,
    title,
    team: str(flat.department),
    location: str(flat.Location ?? flat.location),
    employmentType: str(flat.employmentType ?? flat.employment_type),
    postedAt: toIsoDateOnly(posted),
    excerpt: str(flat.description),
    mood: str(flat.mood) || undefined,
  };
}

function mapToDetail(
  flat: AnyObject,
  raw: { id?: number | string; documentId?: string } & AnyObject,
  jobDescriptionHtml: string,
): CareerJob | null {
  const base = mapToListItem(flat, raw);
  if (!base) {
    return null;
  }
  const applyUrl = str(
    flat.apply_link ?? flat.applyLink ?? flat.url_apply ?? flat.applyURL,
  );
  return {
    ...base,
    jobDescriptionHtml,
    applyUrl,
    seoTitle: str(flat.seo_title ?? flat.seoTitle) || undefined,
    seoDescription: str(flat.seo_description ?? flat.seoDescription) || undefined,
    ogTitle: str(flat.og_title ?? flat.ogTitle) || undefined,
    ogDescription: str(flat.ogDescription ?? flat.og_description) || undefined,
    ogImageUrl: firstOgImageUrl(flat),
  };
}

function normalizeListItem(
  raw: { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject,
): CareerJobListItem | null {
  const flat = getFlat(raw);
  return mapToListItem(flat, raw);
}

function normalizeJobFull(
  raw: { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject,
): CareerJob | null {
  const flat = getFlat(raw);
  const rawHtml = jobDescriptionToHtml(flat);
  const jobDescriptionHtml = sanitizeBlogHtml(rawHtml);
  return mapToDetail(flat, raw, jobDescriptionHtml);
}

const LIST_QUERY = "pagination[pageSize]=100&sort[0]=posted:desc&populate=*";

export async function fetchCareerSummariesFromStrapi(): Promise<CareerJobListItem[]> {
  const path = `${CAREERS_PATH}?${LIST_QUERY}`;
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const list = (data.data ?? []) as Array<{ id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject>;
  const out: CareerJobListItem[] = [];
  for (const item of list) {
    const row = normalizeListItem(item);
    if (row) {
      out.push(row);
    }
  }
  out.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  return out;
}

export async function fetchCareerSlugsFromStrapi(): Promise<string[]> {
  const jobs = await fetchCareerSummariesFromStrapi();
  return jobs.map((j) => j.slug);
}

export async function fetchCareerBySlugFromStrapi(slug: string): Promise<CareerJob | null> {
  const encoded = encodeURIComponent(slug);
  const path = `${CAREERS_PATH}?filters[slug][$eq]=${encoded}&populate=*`;
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const first = (data.data ?? [])[0] as
    | ({ id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject)
    | undefined;
  if (!first) {
    return null;
  }
  return normalizeJobFull(first);
}
