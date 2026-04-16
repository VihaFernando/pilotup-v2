import { APIResponse, BlogPost, Page } from "@/types";

const DEFAULT_STRAPI_URL = "http://localhost:1337";
const STRAPI_URLS = Array.from(
  new Set([
    process.env.STRAPI_URL,
    process.env.NEXT_PUBLIC_STRAPI_URL,
    DEFAULT_STRAPI_URL,
  ].filter((value): value is string => Boolean(value && value.trim())))
);
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

async function strapiFetch<T>(path: string): Promise<T> {
  const errors: string[] = [];

  for (const baseUrl of STRAPI_URLS) {
    const url = `${baseUrl}${path}`;

    const authModes = STRAPI_API_TOKEN ? [true, false] : [false];
    for (const withAuth of authModes) {
      let response: Response;
      try {
        response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(withAuth && STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
          },
          next: { revalidate: 0 },
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown network error";
        errors.push(`${url} [${withAuth ? "auth" : "no-auth"}] -> ${message}`);
        continue;
      }

      if (response.ok) {
        return response.json() as Promise<T>;
      }

      const body = await response.text().catch(() => "Unable to parse response body");
      errors.push(`${url} [${withAuth ? "auth" : "no-auth"}] -> (${response.status}) ${body}`);

      // If authenticated request failed for reasons other than 401, don't immediately retry without auth.
      if (withAuth && response.status !== 401) {
        break;
      }
    }
  }

  throw new Error(`Strapi fetch failed for ${path}. Attempts: ${errors.join(" | ")}`);
}

function normalizePage(raw: any): Page {
  if (raw?.attributes) return raw as Page;

  const ogImageUrl = raw?.ogImage?.url || raw?.ogImage?.data?.attributes?.url;
  return {
    id: raw.id,
    attributes: {
      title: raw.title,
      slug: raw.slug,
      description: raw.description || "",
      ogImage: ogImageUrl
        ? {
          data: {
            attributes: {
              url: ogImageUrl,
            },
          },
        }
        : undefined,
      ogTitle: raw.ogTitle ?? null,
      ogDescription: raw.ogDescription ?? null,
      canonicalUrl: raw.canonicalUrl ?? null,
      seoKeywords: raw.seoKeywords ?? [],
      publishedAt: raw.publishedAt,
    },
  };
}

function normalizeBlogPost(raw: any): BlogPost {
  if (raw?.attributes) return raw as BlogPost;
  return {
    id: raw.id,
    attributes: {
      title: raw.title,
      slug: raw.slug,
      excerpt: raw.excerpt ?? null,
      content: raw.content ?? null,
      ogImage: raw.ogImage,
      featuredImage: raw.featuredImage,
      publishedAt: raw.publishedAt,
    },
  };
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  const encodedSlug = encodeURIComponent(slug);
  const data = await strapiFetch<APIResponse<Page>>(
    `/api/pages?filters[slug][$eq]=${encodedSlug}&populate=*`
  );
  return data.data?.[0] ? normalizePage(data.data[0]) : null;
}

export async function fetchAllPages(): Promise<Page[]> {
  const data = await strapiFetch<APIResponse<Page>>("/api/pages?populate=*&pagination[pageSize]=100");
  return (data.data ?? []).map(normalizePage);
}

export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  const data = await strapiFetch<APIResponse<BlogPost>>(
    "/api/blog-posts?populate=*&sort=publishedAt:desc&pagination[pageSize]=100"
  );
  return (data.data ?? []).map(normalizeBlogPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const encodedSlug = encodeURIComponent(slug);
  const data = await strapiFetch<APIResponse<BlogPost>>(
    `/api/blog-posts?filters[slug][$eq]=${encodedSlug}&populate=*`
  );
  return data.data?.[0] ? normalizeBlogPost(data.data[0]) : null;
}
