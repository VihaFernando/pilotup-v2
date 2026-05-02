import Head from "next/head";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { LegalRichTextView } from "@/components/legal/LegalRichTextView";
import { termsDocument } from "@/lib/legal/termsContent";
import { fetchStrapiPageRichBySlug, type StrapiRichPageView } from "@/lib/strapiPageRich";
import { GetStaticProps } from "next";

type TermsPageProps = {
  fromStrapi: boolean;
  strapi: StrapiRichPageView | null;
};

export default function TermsPage({ fromStrapi, strapi }: TermsPageProps) {
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
          path="/terms"
          html={strapi.html}
          toc={strapi.toc}
          contentKey="strapi-terms"
        />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Terms & conditions | PilotUP</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <LegalDocumentView document={termsDocument} />
    </>
  );
}

export const getStaticProps: GetStaticProps<TermsPageProps> = async () => {
  let strapi: StrapiRichPageView | null = null;
  try {
    strapi = await fetchStrapiPageRichBySlug("terms");
  } catch {
    strapi = null;
  }
  const fromStrapi = Boolean(strapi);
  return {
    props: { fromStrapi, strapi },
    revalidate: 60,
  };
};
