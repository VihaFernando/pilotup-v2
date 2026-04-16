import Head from "next/head";

type SchemaProps = {
  data: Record<string, unknown>;
};

function SchemaScript({ data }: SchemaProps) {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </Head>
  );
}

export function WebPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return (
    <SchemaScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        description,
        url,
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <SchemaScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PilotUP",
        url: "https://pilotup.io",
        logo: "https://pilotup.io/logo.png",
        sameAs: ["https://twitter.com/pilotup", "https://linkedin.com/company/pilotup"],
      }}
    />
  );
}

export function BlogPostingSchema({
  headline,
  description,
  image,
  datePublished,
}: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
}) {
  return (
    <SchemaScript
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        image,
        datePublished,
        author: { "@type": "Organization", name: "PilotUP" },
        publisher: { "@type": "Organization", name: "PilotUP" },
      }}
    />
  );
}
