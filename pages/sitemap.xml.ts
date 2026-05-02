// pages/sitemap.xml.ts
import { GetServerSideProps } from "next";
import { fetchAllStrapiDocBundles } from "@/lib/docs";
import { fetchCareerSlugsFromStrapi } from "@/lib/careersStrapi";
import { SHOW_DOCUMENTATION } from "@/lib/siteFlags";
import { fetchAllPages, fetchAllBlogPosts } from "@/lib/strapi";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = await fetchAllPages();
  const posts = await fetchAllBlogPosts();

  let docSlugs: string[] = [];
  if (SHOW_DOCUMENTATION) {
    try {
      const bundles = await fetchAllStrapiDocBundles();
      docSlugs = bundles.map((b) => b.view.slug).filter(Boolean);
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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pilotup.io</loc>
    <priority>1.0</priority>
  </url>
  ${SHOW_DOCUMENTATION
    ? `
  <url>
    <loc>https://pilotup.io/docs</loc>
    <priority>0.75</priority>
  </url>`
    : ""}
  <url>
    <loc>https://pilotup.io/careers</loc>
    <priority>0.7</priority>
  </url>
  ${careerSlugs
    .map(
      (slug) => `
  <url>
    <loc>https://pilotup.io/careers/${encodeURIComponent(slug)}</loc>
    <priority>0.65</priority>
  </url>`
    )
    .join("")}
  ${docSlugs
    .map(
      (slug) => `
  <url>
    <loc>https://pilotup.io/docs/${encodeURIComponent(slug)}</loc>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
  ${pages
    .map((page) => {
      const slug = page.attributes?.slug;
      if (!slug || slug === "terms" || slug === "privacy") {
        return "";
      }
      return `
  <url>
    <loc>https://pilotup.io/${slug}</loc>
    <priority>0.8</priority>
  </url>
  `;
    })
    .join("")}
  ${posts
    .map((post) =>
      post.attributes
        ? `
  <url>
    <loc>https://pilotup.io/blog/${post.attributes.slug}</loc>
    <priority>0.7</priority>
  </url>
  `
        : ""
    )
    .join("")}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() { return null }
