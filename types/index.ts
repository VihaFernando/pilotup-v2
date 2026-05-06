export interface Page {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    ogImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    ogTitle?: string | null;
    ogDescription?: string | null;
    canonicalUrl?: string | null;
    seoKeywords?: string[] | string | null;
    seo?: {
      metaTitle?: string | null;
      metaDescription?: string | null;
      keywords?: string[] | string | null;
      metaRobots?: string | null;
      canonicalURL?: string | null;
      metaViewport?: string | null;
      structuredData?: unknown;
      metaImage?: {
        data?:
          | {
              attributes?: {
                url?: string;
              };
              url?: string;
            }
          | Array<{
              attributes?: {
                url?: string;
              };
              url?: string;
            }>;
      };
      openGraph?: {
        ogTitle?: string | null;
        ogDescription?: string | null;
        ogUrl?: string | null;
        ogType?: string | null;
        ogImage?: {
          data?:
            | {
                attributes?: {
                  url?: string;
                };
                url?: string;
              }
            | Array<{
                attributes?: {
                  url?: string;
                };
                url?: string;
              }>;
        };
      };
    };
    publishedAt: string;
  };
}

export interface BlogPost {
  id: number;
  attributes?: {
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | unknown[] | null;
    ogImage?: {
      data?:
      | {
        attributes?: {
          url?: string;
        };
        url?: string;
      }
      | Array<{
        attributes?: {
          url?: string;
        };
        url?: string;
      }>;
    };
    featuredImage?: {
      data?:
      | {
        attributes?: {
          url?: string;
        };
        url?: string;
      }
      | Array<{
        attributes?: {
          url?: string;
        };
        url?: string;
      }>;
    };
    author?: string | null;
    metaDescription?: string | null;
    category?: string | null;
    readTime?: number | null;
    seo?: {
      metaTitle?: string | null;
      metaDescription?: string | null;
      keywords?: string | string[] | null;
      metaRobots?: string | null;
      canonicalURL?: string | null;
      metaViewport?: string | null;
      structuredData?: unknown;
      metaImage?: {
        data?:
          | {
              attributes?: {
                url?: string;
              };
              url?: string;
            }
          | Array<{
              attributes?: {
                url?: string;
              };
              url?: string;
            }>;
      };
      openGraph?: {
        ogTitle?: string | null;
        ogDescription?: string | null;
        ogUrl?: string | null;
        ogType?: string | null;
        ogImage?: {
          data?:
            | {
                attributes?: {
                  url?: string;
                };
                url?: string;
              }
            | Array<{
                attributes?: {
                  url?: string;
                };
                url?: string;
              }>;
        };
      };
    };
    publishedAt?: string;
    createdAt?: string;
  };
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string | unknown[] | null;
  publishedAt?: string;
  createdAt?: string;
}

export interface APIResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
