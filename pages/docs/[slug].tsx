import type { GetServerSideProps } from "next";
import Head from "next/head";
import { DocsErrorState } from "@/components/docs/DocsErrorState";
import { DocsPageShell } from "@/components/docs/DocsPageShell";
import type { DocsSidebarCategory } from "@/components/docs/DocsSidebar";
import {
  buildDocPageSeo,
  buildDocSpotlightItems,
  fetchAllStrapiDocBundles,
  groupDocsForSidebar,
  type DocSpotlightItem,
  plainTextExcerptFromHtml,
} from "@/lib/docs";
import { SHOW_DOCUMENTATION } from "@/lib/siteFlags";
import { sanitizeBlogHtml } from "@/lib/sanitizeBlogHtml";
import { getDocNeighbors, withHeadingIdsAndToc, type DocTocItem } from "@/lib/docHeadings";
import { strapiRichTextToHtml } from "@/lib/strapiRichText";

type Seo = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
};

type DocPageSuccess = {
  categories: DocsSidebarCategory[];
  activeSlug: string;
  docTitle: string;
  /** Intro line under the title (Strapi SEO/OG, else a longer body excerpt). */
  docDescription: string;
  contentHtml: string;
  toc: DocTocItem[];
  prevDoc: { title: string; slug: string } | null;
  nextDoc: { title: string; slug: string } | null;
  spotlightItems: DocSpotlightItem[];
  seo: Seo;
};

type DocPageProps = DocPageSuccess | { error: string };

function isDocSuccess(props: DocPageProps): props is DocPageSuccess {
  return "seo" in props && "contentHtml" in props;
}

export default function DocDetailPage(props: DocPageProps) {
  if ("error" in props) {
    return <DocsErrorState message={props.error} title="Could not load documentation" />;
  }
  if (!isDocSuccess(props)) {
    return <DocsErrorState message="Something went wrong." />;
  }

  const { seo } = props;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
        <link rel="canonical" href={seo.canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:url" content={seo.canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="twitter:image" content={seo.ogImage} />
      </Head>
      <DocsPageShell
        categories={props.categories}
        activeSlug={props.activeSlug}
        docTitle={props.docTitle}
        docDescription={props.docDescription}
        contentHtml={props.contentHtml}
        toc={props.toc}
        prevDoc={props.prevDoc}
        nextDoc={props.nextDoc}
        spotlightItems={props.spotlightItems}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<DocPageProps> = async ({ params, res }) => {
  if (!SHOW_DOCUMENTATION) {
    return { notFound: true };
  }

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");

  const slug = typeof params?.slug === "string" ? params.slug : "";
  if (!slug) {
    return { notFound: true };
  }

  try {
    const bundles = await fetchAllStrapiDocBundles();
    if (bundles.length === 0) {
      return { notFound: true };
    }

    const bundle = bundles.find((b) => b.view.slug === slug);
    if (!bundle) {
      return { notFound: true };
    }

    const views = bundles.map((b) => b.view);
    const categories = groupDocsForSidebar(views);
    const rawHtml = strapiRichTextToHtml(bundle.content);
    const sanitized = sanitizeBlogHtml(rawHtml);
    const { html: contentHtml, toc } = withHeadingIdsAndToc(sanitized);
    const { prev, next } = getDocNeighbors(views, slug);
    const defaultDescription = plainTextExcerptFromHtml(rawHtml) || "PilotUP documentation";
    const seo = buildDocPageSeo(bundle.view, defaultDescription);
    const excerptForIntro = plainTextExcerptFromHtml(rawHtml, 280) || defaultDescription;
    const docDescription = (
      bundle.view.seoDescription?.trim() ||
      bundle.view.ogDescription?.trim() ||
      excerptForIntro
    ).trim();

    const pageProps: DocPageSuccess = {
      categories,
      activeSlug: bundle.view.slug,
      docTitle: bundle.view.title,
      docDescription,
      contentHtml,
      toc,
      prevDoc: prev,
      nextDoc: next,
      spotlightItems: buildDocSpotlightItems(bundles),
      seo: {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        ogImage: seo.ogImage,
        canonicalUrl: seo.canonicalUrl,
      },
    };

    return { props: pageProps };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load documentation.";
    console.error("[docs]", error);
    return { props: { error: message } };
  }
};
