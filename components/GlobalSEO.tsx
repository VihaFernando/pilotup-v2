import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Page } from "@/types";
import { generatePageMeta } from "@/util/metadata";
import { resolveSeoSlug, shouldSkipSeoLookup } from "@/util/seoRoute";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/util/seo";

export function GlobalSEO({ initialPage }: { initialPage?: Page }) {
  const router = useRouter();
  const [page, setPage] = useState<Page | undefined>(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    if (shouldSkipSeoLookup(router.asPath)) {
      setPage(undefined);
      return;
    }

    const slug = resolveSeoSlug(router.asPath);
    if (!slug) {
      setPage(undefined);
      return;
    }

    // SSR already loaded this slug via `_app` → skip duplicate client fetch (no Network row, no Strict Mode abort).
    if (initialPage?.attributes?.slug === slug) {
      return;
    }

    const controller = new AbortController();

    const fetchSEO = async () => {
      try {
        const response = await fetch(`/api/pages/${encodeURIComponent(slug)}`, { signal: controller.signal });
        if (!response.ok) {
          setPage(undefined);
          return;
        }
        const data = (await response.json()) as Page;
        setPage(data);
      } catch {
        setPage(undefined);
      }
    };

    fetchSEO();
    return () => controller.abort();
  }, [router.asPath, initialPage]);

  const meta = useMemo(() => generatePageMeta(page), [page]);
  const webPageSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta.title,
      description: meta.description,
      url: meta.canonicalUrl,
    }),
    [meta]
  );
  const webSiteSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    }),
    []
  );

  const organizationSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "PilotUP",
      url: "https://pilotup.io",
      logo: "https://pilotup.io/logo.png",
      sameAs: ["https://twitter.com/pilotup", "https://linkedin.com/company/pilotup"],
    }),
    []
  );

  if (shouldSkipSeoLookup(router.asPath)) {
    return null;
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      {meta.viewport ? <meta name="viewport" content={meta.viewport} /> : null}
      {meta.keywords ? <meta name="keywords" content={meta.keywords} /> : null}
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:url" content={meta.ogUrl} />
      <meta property="og:image" content={meta.ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:image:alt" content={`${meta.ogTitle} | ${SITE_NAME}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pilotup" />
      <meta name="twitter:title" content={meta.ogTitle} />
      <meta name="twitter:description" content={meta.ogDescription} />
      <meta name="twitter:image" content={meta.ogImage || DEFAULT_OG_IMAGE} />
      <link rel="canonical" href={meta.canonicalUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {meta.structuredData.map((schema, index) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={`seo-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
