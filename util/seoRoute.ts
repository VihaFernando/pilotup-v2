function normalizePath(path: string): string {
  return path.split("?")[0].split("#")[0] || "/";
}

export function shouldSkipSeoLookup(path: string): boolean {
  const cleanPath = normalizePath(path);
  return (
    cleanPath.startsWith("/api/") ||
    cleanPath.startsWith("/_next/") ||
    cleanPath === "/blog" ||
    cleanPath.startsWith("/blog/")
  );
}

export function resolveSeoSlug(path: string): string | null {
  const cleanPath = normalizePath(path);
  if (shouldSkipSeoLookup(cleanPath)) return null;
  if (cleanPath === "/") return "home";

  const slug = cleanPath.replace(/^\/+|\/+$/g, "");
  if (!slug || slug.startsWith("api/pages/")) {
    return null;
  }

  return slug;
}
