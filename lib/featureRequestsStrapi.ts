import { strapiFetch, strapiPut } from "@/lib/strapi";
import type { APIResponse } from "@/types";
import type { FeatureRequestEntry, FeatureRequestType, FeatureRequestView, FeatureReviewStatus } from "@/lib/featureRequests";

const REQUESTS_PATH = process.env.NEXT_PUBLIC_STRAPI_FEATURE_REQUESTS_PATH || "/api/feature-requests";

const HASH_FIELD =
  process.env.STRAPI_FEATURE_UPVOTE_HASH_FIELD ||
  (process.env.NEXT_PUBLIC_STRAPI_FEATURE_UPVOTE_HASH_FIELD as string | undefined) ||
  "upvotedIpHashes";

type AnyObject = Record<string, unknown>;

function getFlat(raw: { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject): AnyObject {
  if (raw?.attributes && typeof raw.attributes === "object") {
    return { id: raw.id, documentId: raw.documentId, ...(raw.attributes as AnyObject) };
  }
  return (raw as AnyObject) || {};
}

const TYPES: FeatureRequestType[] = ["product", "api", "billing", "other"];
const STATUS_ORDER: FeatureReviewStatus[] = [
  "idea",
  "backlog",
  "in-progress",
  "testing",
  "ready-for-development",
  "shipped",
];

function normalizeType(t: unknown): FeatureRequestType {
  const s = String(t ?? "other")
    .toLowerCase()
    .trim();
  if (TYPES.includes(s as FeatureRequestType)) {
    return s as FeatureRequestType;
  }
  return "other";
}

function normalizeStatus(t: unknown): FeatureReviewStatus {
  const raw = String(t ?? "idea")
    .toLowerCase()
    .trim();
  const s = raw.replace(/\s+/g, "-");
  for (const st of STATUS_ORDER) {
    if (st === s || st.replace(/-/g, "") === s.replace(/-/g, "")) {
      return st;
    }
  }
  if (s === "inprogress") {
    return "in-progress";
  }
  if (s === "readyfordevelopment" || s === "rfd") {
    return "ready-for-development";
  }
  return "idea";
}

function getStrapiId(flat: AnyObject, raw: { id?: number | string; documentId?: string } & AnyObject): string {
  if (raw.documentId && typeof raw.documentId === "string") {
    return raw.documentId;
  }
  const id = (raw as { id?: number | string }).id ?? flat.id;
  if (id !== undefined && id !== null) {
    return String(id);
  }
  return "0";
}

function getUpvoteHashes(flat: AnyObject): string[] {
  const key = resolveHashField(flat);
  const json = flat[key] as unknown;
  if (Array.isArray(json)) {
    return json.filter((x): x is string => typeof x === "string" && x.length > 0);
  }
  return [];
}

function resolveHashField(flat: AnyObject): string {
  const known = [HASH_FIELD, "upvotedIpHashes", "upvoted_ip_hashes", "upvoteIpHashes", "ipHashes"];
  for (const k of known) {
    if (k in flat) {
      return k;
    }
  }
  const discovered = Object.keys(flat).find((k) => /upvote/i.test(k) && /hash/i.test(k));
  return discovered || HASH_FIELD;
}

function getNotionPageId(a: AnyObject): string | undefined {
  const raw =
    a.notionPageId ??
    a.notion_page_id ??
    a.notionId ??
    a.notion_id ??
    a.pageId ??
    a.page_id;
  const s = typeof raw === "string" ? raw.trim() : "";
  return s.length > 0 ? s : undefined;
}

function normalizeItem(raw: { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject): FeatureRequestEntry | null {
  const a = getFlat(raw);
  const title = String(a.title ?? "").trim();
  if (!title) {
    return null;
  }
  return {
    strapiId: getStrapiId(a, raw),
    notionPageId: getNotionPageId(a),
    title,
    description: String(a.description ?? "").trim(),
    type: normalizeType(a.type),
    upvotes: Math.max(0, Number.isFinite(Number(a.upvotes)) ? Math.floor(Number(a.upvotes)) : 0),
    reviewStatus: normalizeStatus(
      a.review_status ?? a.reviewStatus ?? a["review status"] ?? a["reviewStatus"],
    ),
  };
}

/**
 * In Strapi, add a JSON field for IP hashes (see `STRAPI_FEATURE_UPVOTE_HASH_FIELD`, default `upvotedIpHashes`)
 * and enable find/update for the server token.
 */
function upvotesFromFlat(flat: AnyObject): number {
  return Math.max(0, Number.isFinite(Number(flat.upvotes)) ? Math.floor(Number(flat.upvotes)) : 0);
}

export function parseStrapiItemForVote(
  raw: { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject,
): { strapiId: string; upvotes: number; ipHashes: string[] } {
  const a = getFlat(raw);
  return {
    strapiId: getStrapiId(a, raw),
    upvotes: upvotesFromFlat(a),
    ipHashes: getUpvoteHashes(a),
  };
}

const FEATURE_REQ_QUERY =
  "pagination[pageSize]=200&sort[0]=upvotes:desc&sort[1]=createdAt:desc&populate=*";

type RawItem = { id?: number | string; documentId?: string; attributes?: AnyObject } & AnyObject;

export async function fetchFeatureRequestEntries(): Promise<FeatureRequestEntry[]> {
  const path = `${REQUESTS_PATH}?${FEATURE_REQ_QUERY}`;
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const list = (data.data ?? []) as RawItem[];
  const out: FeatureRequestEntry[] = [];
  for (const item of list) {
    const entry = normalizeItem(item);
    if (entry) {
      out.push(entry);
    }
  }
  return out;
}

/**
 * Loads requests and whether this voter hash is in Strapi (does not send hash lists to the client).
 */
export async function fetchFeatureRequestsViewForVoter(voterHash: string): Promise<FeatureRequestView[]> {
  const path = `${REQUESTS_PATH}?${FEATURE_REQ_QUERY}`;
  const data = await strapiFetch<APIResponse<unknown>>(path);
  const list = (data.data ?? []) as RawItem[];
  const out: FeatureRequestView[] = [];
  for (const item of list) {
    const entry = normalizeItem(item);
    if (!entry) {
      continue;
    }
    const a = getFlat(item);
    const hasUpvoted = getUpvoteHashes(a).includes(voterHash);
    out.push({ ...entry, hasUpvoted });
  }
  return out;
}

export async function fetchFeatureRequestRawById(strapiId: string): Promise<RawItem> {
  const path = `${REQUESTS_PATH}/${encodeURIComponent(strapiId)}?populate=*`;
  const data = await strapiFetch<{ data: RawItem }>(path);
  if (!data.data) {
    throw new Error("Feature request not found");
  }
  return data.data;
}

type StrapiResponseSingle = { data: { id?: string | number; documentId?: string; attributes?: AnyObject } & AnyObject };

/**
 * Appends a salted IP hash and increments `upvotes` if the hash is new.
 */
export async function registerUpvoteInStrapi(
  strapiId: string,
  ipHash: string,
): Promise<{ upvotes: number; hasUpvoted: boolean; wasNew: boolean }> {
  const raw = await fetchFeatureRequestRawById(strapiId);
  const a = getFlat(raw);
  const hashField = resolveHashField(a);
  const { upvotes, ipHashes } = parseStrapiItemForVote(raw);
  if (ipHashes.includes(ipHash)) {
    return { upvotes, hasUpvoted: true, wasNew: false };
  }
  const next = [...ipHashes, ipHash];
  const newUp = upvotes + 1;
  const path = `${REQUESTS_PATH}/${encodeURIComponent(strapiId)}`;
  const tryFields = Array.from(new Set([hashField, HASH_FIELD, "upvoted_ip_hashes", "upvotedIpHashes"]));
  let lastError: unknown = null;
  for (const field of tryFields) {
    try {
      await strapiPut<StrapiResponseSingle>(path, {
        data: {
          upvotes: newUp,
          [field]: next,
        },
      });
      return { upvotes: newUp, hasUpvoted: true, wasNew: true };
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : "";
      if (!/Invalid key/i.test(message)) {
        throw error;
      }
    }
  }
  if (lastError instanceof Error) {
    throw new Error(
      `${lastError.message}. Could not find a valid Strapi hash field. Set STRAPI_FEATURE_UPVOTE_HASH_FIELD to your JSON field API key.`,
    );
  }
  throw new Error("Could not update feature request upvote hash field.");
}

export { HASH_FIELD as STRAPI_UPVOTE_HASH_FIELD };
