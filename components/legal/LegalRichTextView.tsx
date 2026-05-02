"use client";

import Link from "next/link";
import { DocTableOfContents } from "@/components/docs/DocTableOfContents";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { DocTocItem } from "@/lib/docHeadings";

const LEGAL_RICH_CLASS = [
  "legal-rich mt-6 text-base font-normal leading-relaxed text-brand-textMuted",
  "[&_p]:mb-4 [&_p]:font-normal [&_p]:last:mb-0",
  "[&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc",
  "[&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal",
  "[&_li]:mb-1.5 [&_li]:font-normal",
  "[&_a]:font-medium [&_a]:text-[rgb(252,94,86)] [&_a]:underline-offset-2 hover:[&_a]:underline",
  "[&_strong]:font-medium [&_h1]:mb-4 [&_h1]:scroll-mt-28 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-brand-text",
  "[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-brand-text [&_h2]:first:mt-0",
  "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-brand-text",
  "[&_h4]:scroll-mt-24 [&_h4]:font-medium [&_h5]:scroll-mt-24 [&_h5]:font-medium [&_h6]:scroll-mt-24 [&_h6]:font-medium",
  "[&_hr]:mt-5 [&_hr]:mb-8 [&_hr]:border-brand-border/60",
  "[&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:text-[0.9em] dark:[&_code]:bg-white/10",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-brand-border [&_blockquote]:pl-3 [&_blockquote]:italic",
  "[&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-brand-border/80 [&_th]:bg-brand-surface-alt [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_td]:border [&_td]:border-brand-border/60 [&_td]:px-3 [&_td]:py-2",
].join(" ");

type LegalRichTextViewProps = {
  title: string;
  lastUpdated: string;
  /** `/terms` or `/privacy` for cross-link copy */
  path: "/terms" | "/privacy";
  html: string;
  toc: DocTocItem[];
  /** Bumps `key` on client if HTML changes (SSR-safe) */
  contentKey: string;
};

export function LegalRichTextView({ title, lastUpdated, path, html, toc, contentKey }: LegalRichTextViewProps) {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt">
      <Navigation />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 md:px-8">
        <header className="mb-10 text-left sm:mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-brand-textMuted sm:text-base">Last updated: {lastUpdated}</p>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 text-left lg:flex-row lg:items-start lg:gap-16 xl:gap-20">
          <div className="min-w-0 flex-1 lg:max-w-3xl">
            <article
              key={contentKey}
              // eslint-disable-next-line react/no-danger -- sanitized in getStaticProps
              className={LEGAL_RICH_CLASS}
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <p className="mt-12 border-t border-brand-border/80 pt-8 text-sm text-brand-textMuted">
              {path === "/terms" ? (
                <>
                  For how we handle personal data, see our{" "}
                  <Link href="/privacy" className="font-medium text-brand-primaryAccent hover:underline">
                    Privacy policy
                  </Link>
                  .
                </>
              ) : (
                <>
                  For rules governing use of the product, see our{" "}
                  <Link href="/terms" className="font-medium text-brand-primaryAccent hover:underline">
                    Terms & conditions
                  </Link>
                  .
                </>
              )}
            </p>
          </div>

          {toc.length > 0 ? (
            <aside className="hidden w-full min-w-0 shrink-0 lg:sticky lg:top-28 lg:block lg:max-h-[min(100dvh-8rem,36rem)] lg:w-56 lg:overflow-y-auto lg:self-start 2xl:w-64">
              <DocTableOfContents items={toc} scrollTarget="window" />
            </aside>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
