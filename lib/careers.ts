export type CareerJobListItem = {
  slug: string;
  title: string;
  /** `department` in Strapi */
  team: string;
  /** `Location` / `location` */
  location: string;
  /** Optional — add in Strapi if you use it */
  employmentType: string;
  /** ISO date */
  postedAt: string;
  /** Short `description` */
  excerpt: string;
  /** Strapi `mood` — expected values like full-time / part-time (enumeration). */
  mood?: string;
};

const MOOD_NORM = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, "");

/**
 * Maps Strapi `mood` (e.g. fulltime, parttime, or full-time) to display labels.
 * Falls back to a readable version of the raw value, or `null` if empty.
 */
export function formatMoodForDisplay(mood: string | undefined): string | null {
  if (!mood) {
    return null;
  }
  const t = String(mood).trim();
  if (!t) {
    return null;
  }
  const key = MOOD_NORM(t);
  if (key === "fulltime") {
    return "Full-time";
  }
  if (key === "parttime") {
    return "Part-time";
  }
  return t
    .split(/[\s_\-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Briefcase line: `mood` (full-time / part-time) when set, else `employmentType`. */
export function careerEmploymentLabel(job: Pick<CareerJobListItem, "mood" | "employmentType">): string | null {
  const fromMood = formatMoodForDisplay(job.mood);
  if (fromMood) {
    return fromMood;
  }
  const et = (job.employmentType || "").trim();
  return et || null;
}

export type CareerJob = CareerJobListItem & {
  jobDescriptionHtml: string;
  /** `apply_link` */
  applyUrl: string;
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string | null;
};
