import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { fetchCareerSummariesFromStrapi } from "@/lib/careersStrapi";
import { careerEmploymentLabel, type CareerJobListItem } from "@/lib/careers";
import { DEFAULT_OG_IMAGE, SITE_NAME, normalizedCanonical } from "@/util/seo";

type Props = {
  jobs: CareerJobListItem[];
};

function formatPosted(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function CareersPage({ jobs }: Props) {
  const canonicalUrl = normalizedCanonical("/careers");
  const metaTitle = "Careers | PilotUP";
  const metaDescription = "Join PilotUP. We're building AI employees for every team-view open roles and apply.";
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>

      <Navigation />

      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 md:px-8 lg:max-w-5xl">
        <header className="mb-10 text-balance sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primaryAccent">Join us</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">Careers</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-textMuted">
            We&apos;re building a world where every business can run on AI employees that feel human, ship fast, and
            work together. If that sounds like your kind of problem, we&apos;d love to meet you.
          </p>
        </header>

        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white/60 px-6 py-16 text-center">
            <p className="text-lg font-medium text-brand-text">No open roles right now</p>
            <p className="mt-2 text-sm text-brand-textMuted">
              We don&apos;t have listings at the moment. Check back soon or say hello at{" "}
              <a href="mailto:hello@pilotup.io" className="font-medium text-brand-primaryAccent hover:underline">
                hello@pilotup.io
              </a>
              .
            </p>
            <Link
              href="/waitlist"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-secondaryAccent px-5 py-2.5 text-sm font-semibold text-brand-buttonText transition hover:opacity-90"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {jobs.map((job) => {
              const employment = careerEmploymentLabel(job);
              return (
              <li key={job.slug}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group block rounded-2xl border border-brand-border/90 bg-white p-5 shadow-sm transition hover:border-brand-primaryAccent/30 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-brand-text group-hover:text-brand-primaryAccent sm:text-xl">
                        {job.title}
                      </h2>
                      {job.team ? <p className="mt-1 text-sm text-brand-textMuted">{job.team}</p> : null}
                      {job.excerpt ? (
                        <p className="mt-2 text-sm leading-relaxed text-brand-textMuted">{job.excerpt}</p>
                      ) : null}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-textMuted sm:text-sm">
                        {job.location ? (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                        ) : null}
                        {employment ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" />
                            {employment}
                          </span>
                        ) : null}
                        {job.postedAt ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            Posted {formatPosted(job.postedAt)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-primaryAccent sm:pt-1">
                      View role
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
            })}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const jobs = await fetchCareerSummariesFromStrapi();
    return { props: { jobs }, revalidate: 60 };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("[careers] Strapi fetch failed:", message);
    return { props: { jobs: [] }, revalidate: 60 };
  }
};
