export type BlogSource = "strapi" | "supabase";

export function getBlogSource(): BlogSource {
    const value = (process.env.NEXT_PUBLIC_BLOG_SOURCE || process.env.BLOG_SOURCE || "strapi").toLowerCase();
    return value === "supabase" ? "supabase" : "strapi";
}
