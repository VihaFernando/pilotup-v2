import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getClientIpFromRequest } from "@/lib/clientIp";
import { FeatureRequestsPageClient } from "@/components/feature-requests/FeatureRequestsPageClient";
import { fetchFeatureRequestsViewForVoter } from "@/lib/featureRequestsStrapi";
import { hashIpForFeatureVote } from "@/lib/voteIpHash";
import type { FeatureRequestView } from "@/lib/featureRequests";
import { DEFAULT_OG_IMAGE, SITE_NAME, normalizedCanonical } from "@/util/seo";

type PageProps = {
  initialRequests: FeatureRequestView[];
};

export default function FeatureRequestsPage({ initialRequests }: PageProps) {
  const canonicalUrl = normalizedCanonical("/feature-requests");
  const metaTitle = "Feature requests | PilotUP";
  const metaDescription = "Vote on product ideas and follow what we are building at PilotUP.";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metaTitle,
    description: metaDescription,
    url: canonicalUrl,
  };

  return (
    <>
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
      <FeatureRequestsPageClient initialRequests={initialRequests} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req, res }) => {
  res.setHeader("Cache-Control", "private, no-store, must-revalidate");

  try {
    const ip = getClientIpFromRequest(req);
    const hash = hashIpForFeatureVote(ip);
    const initialRequests = await fetchFeatureRequestsViewForVoter(hash);
    return { props: { initialRequests } };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[feature-requests] Strapi fetch failed:", message);
    return { props: { initialRequests: [] } };
  }
};
