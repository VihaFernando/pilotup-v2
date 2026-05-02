import { strapiFetch } from "@/lib/strapi";
import { sanitizeBlogHtml } from "@/lib/sanitizeBlogHtml";
import type { ChangelogEntry } from "@/lib/changelog";
import type { APIResponse } from "@/types";

type AnyObject = Record<string, unknown>;

function getFlat(raw: { id?: number | string; attributes?: AnyObject } & AnyObject): AnyObject {
  if (raw?.attributes && typeof raw.attributes === "object") {
    return { id: raw.id, ...(raw.attributes as AnyObject) };
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

/** TinyMCE / long text may be a string or Strapi 5 block shape */
function releaseNotesToHtml(raw: AnyObject): string {
  const n =
    raw.release_notws ?? raw.release_notes ?? raw.body ?? raw.richText ?? null;
  if (typeof n === "string") {
    return n;
  }
  if (n && typeof n === "object" && "body" in n && typeof (n as { body?: string }).body === "string") {
    return (n as { body: string }).body;
  }
  return "";
}

function parseTagsField(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) {
      return [];
    }
    try {
      const parsed = JSON.parse(s) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((t) => String(t).trim()).filter(Boolean);
      }
    } catch {
      return s.split(/[,\n]/).map((x) => x.trim()).filter(Boolean);
    }
  }
  return [];
}

function normalizeChangelogItem(raw: { id?: number | string; attributes?: AnyObject } & AnyObject): ChangelogEntry | null {
  const a = getFlat(raw) as AnyObject;
  const title = String(a.title ?? "").trim();
  const version = String(a.release_version ?? a.releaseVersion ?? "").trim() || "0.0.0";
  if (!title) {
    return null;
  }
  const id = String((raw as { id?: number | string }).id ?? a.id ?? version);
  const date = toIsoDateOnly(a.publishedAt ?? a.createdAt ?? a.updatedAt);
  const bodyRaw = releaseNotesToHtml(a);
  const bodyHtml = sanitizeBlogHtml(typeof bodyRaw === "string" ? bodyRaw : "");
  const tags = parseTagsField(a.tags);

  return {
    id,
    date,
    version,
    title,
    bodyHtml,
    tags,
  };
}

const CHANGELOGS_PATH = process.env.NEXT_PUBLIC_STRAPI_CHANGELOGS_PATH || "/api/changelogs";

/**
 * Fetches all changelog entries from Strapi (collection `changelogs` by default).
 * Set `NEXT_PUBLIC_STRAPI_CHANGELOGS_PATH` if your REST name differs.
 */
export async function fetchChangelogEntries(): Promise<ChangelogEntry[]> {
  const path = `${CHANGELOGS_PATH}?pagination[pageSize]=100&sort=createdAt:desc&populate=*`;
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const list = (data.data ?? []) as Array<{ id?: number | string; attributes?: AnyObject } & AnyObject>;
  const out: ChangelogEntry[] = [];
  for (const item of list) {
    const entry = normalizeChangelogItem(item);
    if (entry) {
      out.push(entry);
    }
  }
  out.sort((a, b) => b.date.localeCompare(a.date) || b.version.localeCompare(a.version, undefined, { numeric: true }));
  return out;
}
