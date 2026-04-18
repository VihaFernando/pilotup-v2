import sanitizeHtml from "sanitize-html";
import { resolveStrapiAsset } from "@/lib/blog";

const BLOG_ALLOWED_TAGS = Array.from(
    new Set([...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption"])
);

const BLOG_ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: [...(sanitizeHtml.defaults.allowedAttributes.a ?? []), "target", "rel"],
    img: ["src", "srcset", "alt", "title", "width", "height", "loading", "decoding"],
    figure: ["class"],
    figcaption: ["class"],
};

function normalizeImageUrl(url?: string): string | undefined {
    if (!url) return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    if (trimmed.startsWith("data:")) return trimmed;
    return resolveStrapiAsset(trimmed);
}

function normalizeImageSrcSet(srcset?: string): string | undefined {
    if (!srcset) return undefined;

    const normalizedEntries = srcset
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
        .map((entry) => {
            const [rawUrl, ...descriptorParts] = entry.split(/\s+/);
            const normalizedUrl = normalizeImageUrl(rawUrl);
            if (!normalizedUrl) return "";
            const descriptor = descriptorParts.join(" ");
            return descriptor ? `${normalizedUrl} ${descriptor}` : normalizedUrl;
        })
        .filter(Boolean);

    return normalizedEntries.length > 0 ? normalizedEntries.join(", ") : undefined;
}

export function sanitizeBlogHtml(content: string): string {
    return sanitizeHtml(content, {
        allowedTags: BLOG_ALLOWED_TAGS,
        allowedAttributes: BLOG_ALLOWED_ATTRIBUTES,
        allowedSchemes: [...new Set([...(sanitizeHtml.defaults.allowedSchemes ?? []), "data"])],
        allowedSchemesByTag: {
            ...sanitizeHtml.defaults.allowedSchemesByTag,
            img: ["http", "https", "data"],
        },
        transformTags: {
            img: (tagName, attribs) => {
                const normalizedSrc = normalizeImageUrl(attribs.src);
                const normalizedSrcSet = normalizeImageSrcSet(attribs.srcset);

                return {
                    tagName,
                    attribs: {
                        ...attribs,
                        ...(normalizedSrc ? { src: normalizedSrc } : {}),
                        ...(normalizedSrcSet ? { srcset: normalizedSrcSet } : {}),
                    },
                };
            },
            a: (tagName, attribs) => {
                if (attribs.target !== "_blank") {
                    return { tagName, attribs };
                }

                const relValues = new Set((attribs.rel ?? "").split(/\s+/).filter(Boolean));
                relValues.add("noopener");
                relValues.add("noreferrer");

                return {
                    tagName,
                    attribs: {
                        ...attribs,
                        rel: Array.from(relValues).join(" "),
                    },
                };
            },
        },
    });
}