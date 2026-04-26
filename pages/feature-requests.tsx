import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getClientIpFromRequest } from "@/lib/clientIp";
import { FeatureRequestsPageClient } from "@/components/feature-requests/FeatureRequestsPageClient";
import { fetchFeatureRequestsViewForVoter } from "@/lib/featureRequestsStrapi";
import { hashIpForFeatureVote } from "@/lib/voteIpHash";
import type { FeatureRequestView } from "@/lib/featureRequests";

type PageProps = {
  initialRequests: FeatureRequestView[];
};

export default function FeatureRequestsPage({ initialRequests }: PageProps) {
  return (
    <>
      <Head>
        <title>Feature requests | PilotUP</title>
        <meta
          name="description"
          content="Vote on product ideas and follow what we are building at PilotUP."
        />
        <link rel="canonical" href="/feature-requests" />
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
