// pages/sitemap.xml.ts
import { GetServerSideProps } from 'next'
import { fetchAllPages, fetchAllBlogPosts } from '@/lib/strapi'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = await fetchAllPages()
  const posts = await fetchAllBlogPosts()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pilotup.io</loc>
    <priority>1.0</priority>
  </url>
  ${pages.map(page => page.attributes ? `
  <url>
    <loc>https://pilotup.io/${page.attributes.slug}</loc>
    <priority>0.8</priority>
  </url>
  ` : '').join('')}
  ${posts.map(post => post.attributes ? `
  <url>
    <loc>https://pilotup.io/blog/${post.attributes.slug}</loc>
    <priority>0.7</priority>
  </url>
  ` : '').join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() { return null }