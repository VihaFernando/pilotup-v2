import { GetServerSideProps } from "next";
import { fetchCareerSlugsFromStrapi } from "@/lib/careersStrapi";
import { fetchAllStrapiDocBundles } from "@/lib/docs";
import { SHOW_DOCUMENTATION } from "@/lib/siteFlags";
import { fetchAllBlogPosts, fetchAllPages } from "@/lib/strapi";

const SITE_URL = "https://pilotup.io";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = await fetchAllPages();
  const posts = await fetchAllBlogPosts();
  const staticRoutes = [
    "/",
    "/careers",
    "/blog",
    "/changelog",
    "/feature-requests",
    "/brand-assets",
    ...(SHOW_DOCUMENTATION ? ["/docs"] : []),
  ];

  let docSlugs: string[] = [];
  if (SHOW_DOCUMENTATION) {
    try {
      const bundles = await fetchAllStrapiDocBundles();
      docSlugs = bundles.map((bundle) => bundle.view.slug).filter(Boolean);
    } catch {
      // Strapi may be offline during build; omit docs from sitemap.
    }
  }

  let careerSlugs: string[] = [];
  try {
    careerSlugs = await fetchCareerSlugsFromStrapi();
  } catch {
    // Strapi may be offline; omit career jobs from sitemap.
  }

  const urlEntries = new Map<string, number>();
  const normalizePath = (path: string): string => {
    const homeNormalized = path === "/home" ? "/" : path;
    const withLeadingSlash = homeNormalized.startsWith("/") ? homeNormalized : `/${homeNormalized}`;
    let cleaned = withLeadingSlash;

    try {
      cleaned = decodeURIComponent(cleaned);
    } catch {
      // Keep original string if decode fails.
    }

    cleaned = cleaned.replace(/2F-/g, "/").replace(/\/-/g, "/");
    cleaned = cleaned.replace(/\/{2,}/g, "/");

    return cleaned === "/home" ? "/" : cleaned;
  };

  const addUrl = (path: string, priority: number) => {
    const finalPath = normalizePath(path);
    const loc = `${SITE_URL}${finalPath === "/" ? "" : finalPath}`;
    const existingPriority = urlEntries.get(loc);
    if (typeof existingPriority === "number") {
      urlEntries.set(loc, Math.max(existingPriority, priority));
      return;
    }
    urlEntries.set(loc, priority);
  };

  staticRoutes.forEach((route) => addUrl(route, route === "/" ? 1.0 : 0.7));
  pages.forEach((page) => {
    const slug = page.attributes?.slug;
    if (!slug || slug === "terms" || slug === "privacy") {
      return;
    }
    addUrl(slug === "home" ? "/" : `/${slug}`, slug === "home" ? 1.0 : 0.8);
  });
  if (SHOW_DOCUMENTATION) {
    docSlugs.forEach((slug) => addUrl(`/docs/${encodeURIComponent(slug)}`, 0.7));
  }
  careerSlugs.forEach((slug) => addUrl(`/careers/${encodeURIComponent(slug)}`, 0.65));
  posts.forEach((post) => {
    const slug = post.attributes?.slug;
    if (!slug) {
      return;
    }
    addUrl(`/blog/${encodeURIComponent(slug)}`, 0.7);
  });

  const urlsXml = Array.from(urlEntries.entries())
    .map(
      ([loc, priority]) => `
  <url>
    <loc>${loc}</loc>
    <priority>${priority.toFixed(2)}</priority>
  </url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
