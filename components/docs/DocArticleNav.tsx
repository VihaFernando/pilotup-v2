import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DocNavLink } from "@/lib/docHeadings";

type DocArticleNavProps = {
  prev: DocNavLink | null;
  next: DocNavLink | null;
};

/**
 * Previous / next doc links using real page titles and chevrons (not the words “Previous” / “Next”).
 */
export function DocArticleNav({ prev, next }: DocArticleNavProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Adjacent pages"
      className="mt-12 border-t border-slate-200 pt-10 dark:border-[#3d3d3d]"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="min-w-0 sm:justify-self-start">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="group flex items-start gap-2 text-left text-slate-700 transition hover:text-slate-900 dark:text-[#b0b0b0] dark:hover:text-white"
            >
              <ChevronLeft
                className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-slate-600 dark:text-[#7a7a7a] dark:group-hover:text-[#c4c4c4]"
                strokeWidth={2}
                aria-hidden
              />
              <span className="min-w-0 text-sm font-semibold leading-snug sm:text-base">{prev.title}</span>
            </Link>
          ) : (
            <span className="block h-5" aria-hidden />
          )}
        </div>
        <div className="min-w-0 sm:justify-self-end sm:text-right">
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group flex items-start justify-end gap-2 text-right text-slate-700 transition hover:text-slate-900 dark:text-[#b0b0b0] dark:hover:text-white"
            >
              <span className="min-w-0 text-sm font-semibold leading-snug sm:text-base">{next.title}</span>
              <ChevronRight
                className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-slate-600 dark:text-[#7a7a7a] dark:group-hover:text-[#c4c4c4]"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
