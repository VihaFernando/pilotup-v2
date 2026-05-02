import type { GetServerSideProps } from "next";
import { DocsErrorState } from "@/components/docs/DocsErrorState";
import { fetchAllStrapiDocBundles } from "@/lib/docs";
import { SHOW_DOCUMENTATION } from "@/lib/siteFlags";

type IndexProps = { kind: "empty" } | { kind: "error"; message: string };

/**
 * /docs → first document by order (and title), or an empty / error state (SSR, noindex).
 */
export default function DocsIndexPage(props: IndexProps) {
  if (props.kind === "empty") {
    return <DocsErrorState message="No documentation is published yet. Check back soon." />;
  }
  if (props.kind === "error") {
    return <DocsErrorState message={props.message} title="Could not load documentation" />;
  }
  return null;
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async ({ res }) => {
  if (!SHOW_DOCUMENTATION) {
    return { notFound: true };
  }

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");

  try {
    const bundles = await fetchAllStrapiDocBundles();
    if (bundles.length === 0) {
      return { props: { kind: "empty" as const } };
    }
    const sorted = [...bundles].sort(
      (a, b) => a.view.order - b.view.order || a.view.title.localeCompare(b.view.title)
    );
    return {
      redirect: { destination: `/docs/${sorted[0].view.slug}`, permanent: false },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load documentation.";
    console.error("[docs index]", error);
    return { props: { kind: "error" as const, message } };
  }
};
