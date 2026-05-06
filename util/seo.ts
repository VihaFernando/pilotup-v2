export const SITE_URL = "https://pilotup.io";
export const SITE_NAME = "PilotUP";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function normalizedCanonical(pathOrUrl: string): string {
  const absolute = toAbsoluteUrl(pathOrUrl);
  return absolute.endsWith("/") && absolute !== `${SITE_URL}/` ? absolute.slice(0, -1) : absolute;
}
