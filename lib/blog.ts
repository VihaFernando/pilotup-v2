import type { BlogPost } from "@/types";

const STRAPI_PUBLIC_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";

export type BlogViewModel = {
    id: number;
    slug: string;
    title: string;
    content: string;
    summary: string;
    coverUrl: string;
    publishedAt: string;
};

type AnyObject = Record<string, any>;

function getAttrs(post: BlogPost): AnyObject {
    const maybeAttrs = (post as AnyObject)?.attributes;
    return maybeAttrs && typeof maybeAttrs === "object" ? maybeAttrs : (post as AnyObject);
}

function firstMediaUrl(mediaField: any): string {
    if (!mediaField) return "";
    if (typeof mediaField === "string") return resolveStrapiAsset(mediaField);
    const data = mediaField.data ?? mediaField;
    if (typeof data === "string") return resolveStrapiAsset(data);
    if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        const url = first?.attributes?.url ?? first?.url;
        return resolveStrapiAsset(url ?? "");
    }
    const url = data?.attributes?.url ?? data?.url;
    return resolveStrapiAsset(url ?? "");
}

function blocksToHtml(blocks: any): string {
    if (!Array.isArray(blocks)) return "";

    const renderInline = (children: any[] = []) =>
        children
            .map((child) => {
                const text = String(child?.text ?? "");
                if (!text) return "";
                if (child?.code) return `<code>${text}</code>`;
                if (child?.bold) return `<strong>${text}</strong>`;
                if (child?.italic) return `<em>${text}</em>`;
                if (child?.underline) return `<u>${text}</u>`;
                return text;
            })
            .join("");

    return blocks
        .map((block) => {
            const type = block?.type;
            if (type === "paragraph") return `<p>${renderInline(block?.children)}</p>`;
            if (type === "heading") {
                const level = Math.min(6, Math.max(1, Number(block?.level) || 2));
                return `<h${level}>${renderInline(block?.children)}</h${level}>`;
            }
            if (type === "quote") return `<blockquote>${renderInline(block?.children)}</blockquote>`;
            if (type === "list") {
                const tag = block?.format === "ordered" ? "ol" : "ul";
                const items = Array.isArray(block?.children)
                    ? block.children.map((item: any) => `<li>${renderInline(item?.children)}</li>`).join("")
                    : "";
                return `<${tag}>${items}</${tag}>`;
            }
            if (type === "code") return `<pre><code>${String(block?.code ?? "")}</code></pre>`;
            if (type === "image" && block?.image?.url) {
                const src = resolveStrapiAsset(block.image.url);
                const alt = String(block?.image?.alternativeText ?? "");
                return `<img src="${src}" alt="${alt}" />`;
            }
            return renderInline(block?.children || []);
        })
        .join("\n");
}

export function resolveStrapiAsset(url?: string | null): string {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
    return `${STRAPI_PUBLIC_URL}${url}`;
}

function resolveStrapiAssetInHtml(html: string): string {
    return html
        .replace(/(<img[^>]+src=["'])(\/[^"']+)(["'])/gi, (_match, prefix, src, quote) => {
            return `${prefix}${resolveStrapiAsset(src)}${quote}`;
        })
        .replace(/(<img[^>]+srcset=["'])(.*?)(["'])/gi, (_match, prefix, value, quote) => {
            const normalized = value
                .split(",")
                .map((item: string) => {
                    const [url, descriptor] = item.trim().split(/\s+/);
                    const resolvedUrl = url.startsWith("http") || url.startsWith("data:") ? url : resolveStrapiAsset(url);
                    return descriptor ? `${resolvedUrl} ${descriptor}` : resolvedUrl;
                })
                .join(", ");
            return `${prefix}${normalized}${quote}`;
        });
}

function normalizeContent(content: unknown): string {
    if (typeof content === "string") return resolveStrapiAssetInHtml(content);
    if (Array.isArray(content)) return resolveStrapiAssetInHtml(blocksToHtml(content));
    return "";
}

export function mapBlogPost(post: BlogPost): BlogViewModel {
    const attrs = getAttrs(post);
    const content = normalizeContent(attrs.content);
    const coverUrl = firstMediaUrl(attrs.ogImage) || firstMediaUrl(attrs.featuredImage);
    return {
        id: post.id,
        slug: attrs.slug,
        title: attrs.title,
        content,
        summary: attrs.excerpt || "",
        coverUrl,
        publishedAt: attrs.publishedAt || attrs.createdAt || new Date().toISOString(),
    };
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

export function calculateReadTime(content: unknown): number {
    return Math.max(1, Math.ceil(stripHtml(content).split(/\s+/).filter(Boolean).length / 250));
}

export function calculateReadTimeFromHtml(html: string): number {
    return Math.max(1, Math.ceil(html.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length / 250));
}

export function extractTextFromHTML(html: unknown, maxLength = 200): string {
    const text = stripHtml(html);
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

function stripHtml(html: unknown): string {
    const normalized = normalizeContent(html);
    return normalized.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
