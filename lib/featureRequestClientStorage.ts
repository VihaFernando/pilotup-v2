const UPVOTED_KEY = "pilotup-fr-upvoted-ids";
const LAST_REQUEST_KEY = "pilotup-fr-last-notion-page-id";

export function featureRequestItemStorageId(row: { notionPageId?: string; strapiId: string }): string {
  return row.notionPageId?.trim() || row.strapiId;
}

export function loadUpvotedFeatureRequestIds(): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }
  try {
    const raw = window.localStorage.getItem(UPVOTED_KEY);
    if (!raw) {
      return new Set();
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return new Set();
    }
    return new Set(parsed.filter((x): x is string => typeof x === "string" && x.length > 0));
  } catch {
    return new Set();
  }
}

export function persistUpvotedFeatureRequestId(id: string): void {
  if (typeof window === "undefined" || !id) {
    return;
  }
  const next = loadUpvotedFeatureRequestIds();
  next.add(id);
  window.localStorage.setItem(UPVOTED_KEY, JSON.stringify([...next]));
}

export function persistLastSubmittedNotionPageId(notionPageId: string): void {
  if (typeof window === "undefined" || !notionPageId) {
    return;
  }
  try {
    window.localStorage.setItem(LAST_REQUEST_KEY, notionPageId);
  } catch {
    /* ignore quota */
  }
}
