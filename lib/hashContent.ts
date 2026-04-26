/**
 * Small deterministic hash for React keys (SSR-safe, no btoa/crypto).
 * Resets client subtree when Strapi / CMS HTML body changes.
 */
export function hashContent(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i += 1) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return (h >>> 0).toString(36) + "x" + s.length;
}
