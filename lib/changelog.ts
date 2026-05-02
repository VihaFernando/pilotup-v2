const KNOWN_TAGS = ["feature", "fix", "improvement", "breaking"] as const;

export type ChangelogTag = (typeof KNOWN_TAGS)[number];

/** One release row from Strapi `changelog` (sanitized on the server in `fetchChangelogEntries`). */
export type ChangelogEntry = {
  id: string;
  /** YYYY-MM-DD for the timeline, from `publishedAt` or `createdAt` */
  date: string;
  version: string;
  title: string;
  bodyHtml: string;
  /** Values from the JSON `tags` field; known slugs get badge styles in the UI. */
  tags: string[];
};

export function isChangelogTag(s: string): s is ChangelogTag {
  return (KNOWN_TAGS as readonly string[]).includes(s);
}

export const TAG_STYLES: Record<ChangelogTag, string> = {
  feature: "bg-brand-primaryAccent/10 text-brand-primaryAccent border-brand-primaryAccent/20",
  fix: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400",
  improvement: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10",
  breaking: "bg-amber-500/10 text-amber-800 border-amber-500/25 dark:text-amber-300",
};

export const TAG_LABEL: Record<ChangelogTag, string> = {
  feature: "Feature",
  fix: "Fix",
  improvement: "Improvement",
  breaking: "Breaking",
};

export const UNKNOWN_TAG_CLASS =
  "bg-slate-100/80 text-slate-600 border-slate-200/80 dark:bg-white/5 dark:text-slate-300 dark:border-white/10";
