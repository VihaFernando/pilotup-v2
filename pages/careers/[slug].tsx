import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Briefcase, MapPin, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { fetchCareerBySlugFromStrapi, fetchCareerSlugsFromStrapi } from "@/lib/careersStrapi";
import { careerEmploymentLabel, type CareerJob } from "@/lib/careers";

type Props = {
  job: CareerJob;
};

const CAREER_BODY_CLASS = [
  "career-rich mt-6 text-base leading-relaxed text-brand-textMuted",
  "[&_p]:mb-4 [&_p]:last:mb-0",
  "[&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc",
  "[&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal",
  "[&_li]:mb-1.5",
  "[&_a]:font-medium [&_a]:text-[rgb(252,94,86)] [&_a]:underline-offset-2 hover:[&_a]:underline",
  "[&_strong]:font-semibold",
  "[&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand-text",
  "[&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-brand-text",
  "[&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:text-[0.9em] dark:[&_code]:bg-white/10",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-brand-border [&_blockquote]:pl-3 [&_blockquote]:italic",
].join(" ");

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

function applyTarget(url: string) {
  return /^https?:\/\//i.test(url) ? ("_blank" as const) : undefined;
}

function applyRel(url: string) {
  return /^https?:\/\//i.test(url) ? "noopener noreferrer" : undefined;
}

export default function CareerJobPage({ job }: Props) {
  const pageTitle = job.seoTitle || job.title;
  const pageDesc = job.seoDescription || job.excerpt;
  const hasApply = Boolean(job.applyUrl);
  const employment = careerEmploymentLabel(job);

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt">
      <Head>
        <title>{`${pageTitle} | Careers | PilotUP`}</title>
        <meta name="description" content={pageDesc} />
        {job.ogTitle ? <meta property="og:title" content={job.ogTitle} /> : null}
        {job.ogDescription ? <meta property="og:description" content={job.ogDescription} /> : null}
        {job.ogImageUrl ? <meta property="og:image" content={job.ogImageUrl} /> : null}
        <link rel="canonical" href={`/careers/${job.slug}`} />
      </Head>

      <Navigation />

      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:px-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-textMuted transition hover:text-brand-primaryAccent"
        >
          <ArrowLeft className="h-4 w-4" />
          All roles
        </Link>

        <header className="mt-6 border-b border-brand-border/80 pb-8">
          {job.team ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primaryAccent">{job.team}</p>
          ) : null}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-brand-textMuted">
            {job.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            ) : null}
            {employment ? (
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {employment}
              </span>
            ) : null}
            {job.postedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Posted {formatPosted(job.postedAt)}
              </span>
            ) : null}
          </div>
          {hasApply ? (
            <>
              <a
                href={job.applyUrl}
                target={applyTarget(job.applyUrl)}
                rel={applyRel(job.applyUrl)}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primaryAccent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Apply
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </>
          ) : (
            <p className="mt-8 text-sm text-brand-textMuted">
              Application link is not set for this role yet. Reach out at{" "}
              <a href="mailto:hello@pilotup.io" className="font-medium text-brand-primaryAccent hover:underline">
                hello@pilotup.io
              </a>
              .
            </p>
          )}
        </header>

        {job.jobDescriptionHtml ? (
          <article
            // eslint-disable-next-line react/no-danger -- sanitized in getStaticProps
            className={CAREER_BODY_CLASS}
            dangerouslySetInnerHTML={{ __html: job.jobDescriptionHtml }}
          />
        ) : (
          <p className="mt-10 text-base text-brand-textMuted">Full description coming soon.</p>
        )}

        {hasApply ? (
          <div className="mt-12 border-t border-brand-border/80 pt-8">
            <a
              href={job.applyUrl}
              target={applyTarget(job.applyUrl)}
              rel={applyRel(job.applyUrl)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primaryAccent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto"
            >
              Apply for this role
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await fetchCareerSlugsFromStrapi();
    return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: "blocking" };
  } catch (e) {
    console.error("[careers] paths", e);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (ctx) => {
  const slug = ctx.params?.slug;
  if (!slug) {
    return { notFound: true };
  }
  const job = await fetchCareerBySlugFromStrapi(slug);
  if (!job) {
    return { notFound: true };
  }
  return { props: { job }, revalidate: 60 };
};
