import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileQuestion, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChangelogTimeline } from "@/components/ChangelogTimeline";
import type { ChangelogEntry } from "@/lib/changelog";
import { fetchChangelogEntries } from "@/lib/changelogStrapi";
import { DEFAULT_OG_IMAGE, SITE_NAME, normalizedCanonical } from "@/util/seo";

type ChangelogPageProps = {
  entries: ChangelogEntry[];
};

export default function ChangelogPage({ entries }: ChangelogPageProps) {
  const isEmpty = entries.length === 0;
  const canonicalUrl = normalizedCanonical("/changelog");
  const metaTitle = "Changelog | PilotUP";
  const metaDescription = "Product updates and release notes from PilotUP, listed newest first.";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    description: metaDescription,
    url: canonicalUrl,
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:alt" content={metaTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pilotup" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </Head>
      <Navigation />

      <main className="mx-auto w-full min-w-0 max-w-4xl px-3 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-24 min-[380px]:px-4 sm:max-w-5xl sm:px-6 sm:pb-20 sm:pt-32 md:px-10">
        <header className="mb-10 text-balance text-center sm:mb-16 sm:text-left">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primaryAccent"
          >
            Product updates
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-2 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl"
          >
            Changelog
          </motion.h1>
        </header>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-2xl border border-dashed border-brand-border bg-brand-surface/80 p-6 text-center text-balance sm:rounded-3xl sm:p-14"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-primaryAccent/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-brand-secondaryAccent/5 blur-3xl" />

            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-border/80 bg-brand-surface-alt">
              <FileQuestion className="h-7 w-7 text-brand-textMuted" strokeWidth={1.5} />
            </div>
            <h2 className="relative mt-6 text-xl font-semibold text-brand-text sm:text-2xl">No release notes yet</h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-textMuted sm:text-base">
              We have not published any changelog entries. Check back after the next release, or join the waitlist to hear
              about updates as they ship.
            </p>
            <div className="relative mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/waitlist"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-secondaryAccent px-5 py-2.5 text-sm font-semibold text-brand-buttonText transition hover:opacity-90"
              >
                <Sparkles className="h-4 w-4 opacity-80" />
                Join waitlist
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-brand-textMuted underline-offset-4 transition hover:text-brand-text hover:underline"
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        ) : (
          <ChangelogTimeline entries={entries} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ChangelogPageProps> = async ({ res }) => {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");

  try {
    const entries = await fetchChangelogEntries();
    return { props: { entries } };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[changelog] Strapi fetch failed:", message);
    return { props: { entries: [] } };
  }
};
