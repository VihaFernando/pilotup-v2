import { groupDocsForSidebar, type StrapiDocView } from "@/lib/docs";

export type DocTocItem = {
  id: string;
  level: number;
  text: string;
};

const HEADING_RE = /<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi;

function plainTextFromHeadingInner(inner: string): string {
  return inner
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string, used: Set<string>): string {
  let base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  if (!base) {
    base = "section";
  }
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

/**
 * Injects `id` on h1–h6 (when missing) and builds a table of contents from those headings.
 */
export function withHeadingIdsAndToc(html: string): { html: string; toc: DocTocItem[] } {
  const used = new Set<string>();
  const toc: DocTocItem[] = [];
  const re = new RegExp(HEADING_RE.source, "gi");
  const out = html.replace(re, (full, levelStr: string, attrs: string | undefined, inner: string) => {
    const text = plainTextFromHeadingInner(inner);
    if (!text) {
      return full;
    }
    const rawAttrs = attrs || "";
    if (/\sid\s*=\s*["']/.test(rawAttrs)) {
      const idM = /id\s*=\s*["']([^"']+)["']/.exec(rawAttrs);
      if (idM?.[1]) {
        toc.push({ id: idM[1], level: Number(levelStr), text });
      }
      return full;
    }
    const id = slugify(text, used);
    toc.push({ id, level: Number(levelStr), text });
    return `<h${levelStr}${rawAttrs} id="${id}">${inner}</h${levelStr}>`;
  });
  return { html: out, toc };
}

export type DocNavLink = { title: string; slug: string };

/**
 * Linear doc order: same as the left sidebar (category order, then per-doc `order`).
 */
export function getDocNeighbors(views: StrapiDocView[], currentSlug: string): {
  prev: DocNavLink | null;
  next: DocNavLink | null;
} {
  const grouped = groupDocsForSidebar(views);
  const flat: DocNavLink[] = [];
  for (const cat of grouped) {
    for (const link of cat.links) {
      flat.push({ title: link.label, slug: link.slug });
    }
  }
  const idx = flat.findIndex((d) => d.slug === currentSlug);
  if (idx === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  };
}
