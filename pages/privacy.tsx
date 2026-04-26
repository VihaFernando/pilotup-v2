import Head from "next/head";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { LegalRichTextView } from "@/components/legal/LegalRichTextView";
import { privacyDocument } from "@/lib/legal/privacyContent";
import { fetchStrapiPageRichBySlug, type StrapiRichPageView } from "@/lib/strapiPageRich";
import { GetStaticProps } from "next";

type PrivacyPageProps = {
  fromStrapi: boolean;
  strapi: StrapiRichPageView | null;
};

export default function PrivacyPage({ fromStrapi, strapi }: PrivacyPageProps) {
  if (fromStrapi && strapi) {
    return (
      <>
        <Head>
          <title>{strapi.title} | PilotUP</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <LegalRichTextView
          title={strapi.title}
          lastUpdated={strapi.lastUpdated}
          path="/privacy"
          html={strapi.html}
          toc={strapi.toc}
          contentKey="strapi-privacy"
        />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Privacy policy | PilotUP</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LegalDocumentView document={privacyDocument} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PrivacyPageProps> = async () => {
  let strapi: StrapiRichPageView | null = null;
  try {
    strapi = await fetchStrapiPageRichBySlug("privacy");
  } catch {
    strapi = null;
  }
  const fromStrapi = Boolean(strapi);
  return {
    props: { fromStrapi, strapi },
    revalidate: 60,
  };
};
