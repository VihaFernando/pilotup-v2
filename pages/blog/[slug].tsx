import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Calendar, ArrowLeft, Share2, Clock, Check, Copy } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import BlogPreBlock from "@/components/BlogPreBlock";
import { Navigation } from "@/components/Navigation";
import { getBlogSource } from "@/lib/blogConfig";
import { ARTICLE_BODY_STYLES, MERRIWEATHER_FONT_IMPORT } from "@/lib/articleStyles";
import { fetchBlogPostBySlug } from "@/lib/strapi";
import { BlogViewModel, calculateReadTimeFromHtml, extractTextFromHTML, formatDate, mapBlogPost, resolveStrapiAsset } from "@/lib/blog";
import { fetchSupabaseBlogPostBySlug } from "@/lib/supabaseBlog";
import { sanitizeBlogHtml } from "@/lib/sanitizeBlogHtml";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, normalizedCanonical } from "@/util/seo";

type Props = {
    blog: BlogViewModel | null;
};

const FENCED_CODE_BLOCK_REGEX = /```(?:[\w-]+)?\n([\s\S]*?)```/g;

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(value: string): string {
    return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'");
}

function looksLikeCodeLine(line: string): boolean {
    const value = line.trim();
    if (!value) return false;
    if (/^<\/?[a-zA-Z]/.test(value)) return true;
    if (/^(const|let|var|function|async|await|return|if|else|for|while|try|catch|import|export|class)\b/.test(value)) return true;
    if (/=>/.test(value) || /[{}();]/.test(value)) return true;
    if (/^[a-zA-Z_$][\w$]*\./.test(value)) return true;
    return false;
}

function normalizeCodeContent(rawHtml: string): string {
    const withFencedBlocks = rawHtml.replace(FENCED_CODE_BLOCK_REGEX, (_match, code: string) => {
        return `<pre><code>${escapeHtml(code.trimEnd())}</code></pre>`;
    });

    const paragraphRegex = /<p>([\s\S]*?)<\/p>/gi;
    let result = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let runOriginalParagraphs: string[] = [];
    let runCodeLines: string[] = [];

    const flushRun = () => {
        if (!runOriginalParagraphs.length) return;

        if (runCodeLines.length >= 2) {
            result += `<pre><code>${escapeHtml(runCodeLines.join("\n"))}</code></pre>`;
        } else {
            result += runOriginalParagraphs.join("");
        }

        runOriginalParagraphs = [];
        runCodeLines = [];
    };

    while ((match = paragraphRegex.exec(withFencedBlocks)) !== null) {
        const fullMatch = match[0];
        const innerHtml = match[1] ?? "";
        const start = match.index;

        result += withFencedBlocks.slice(lastIndex, start);
        lastIndex = start + fullMatch.length;

        const paragraphText = decodeHtmlEntities(
            innerHtml
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<[^>]+>/g, "")
                .replace(/\r\n?/g, "\n")
        );

        if (looksLikeCodeLine(paragraphText.trim())) {
            runOriginalParagraphs.push(fullMatch);
            runCodeLines.push(paragraphText);
        } else {
            flushRun();
            result += fullMatch;
        }
    }

    result += withFencedBlocks.slice(lastIndex);
    flushRun();
    return result;
}

type ParsedHtmlNode = {
    type?: string;
    name?: string;
    data?: string;
    attribs?: Record<string, string>;
    children?: ParsedHtmlNode[];
};

function collectTextContent(node?: ParsedHtmlNode): string {
    if (!node) return "";
    if (node.type === "text") return node.data ?? "";
    if (!Array.isArray(node.children) || node.children.length === 0) return "";
    return node.children.map((child) => collectTextContent(child)).join("");
}

function extractLanguageFromClass(className?: string): string | undefined {
    if (!className) return undefined;
    const match = className.match(/language-([a-z0-9_+-]+)/i);
    return match?.[1];
}

declare global {
    interface Window {
        prerenderReady?: boolean;
    }
}

export default function BlogDetailPage({ blog, debug }: InferGetServerSidePropsType<typeof getServerSideProps> & { debug?: string }) {
    if (!blog) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <h1 style={{ color: "#E21339" }}>Blog post not found</h1>
                <p>The blog post could not be loaded. This may be due to a missing or unpublished post, a slug mismatch, or a server error.</p>
                {debug && (
                    <pre style={{ marginTop: 24, color: "#333", background: "#f5f5f5", padding: 16, borderRadius: 8, maxWidth: 600, margin: "24px auto 0" }}>{debug}</pre>
                )}
                <p style={{ marginTop: 32 }}><a href="/blog" style={{ color: "#E21339", textDecoration: "underline" }}>Back to all posts</a></p>
            </div>
        );
    }

    // Defensive: ensure all fields are strings
    const safeContent = typeof blog.content === "string" ? blog.content : "";
    blog.title = typeof blog.title === "string" ? blog.title : "";
    blog.summary = typeof blog.summary === "string" ? blog.summary : "";
    blog.slug = typeof blog.slug === "string" ? blog.slug : "";
    blog.coverUrl = typeof blog.coverUrl === "string" ? blog.coverUrl : "";
    blog.publishedAt = blog.publishedAt || "";

    const [linkCopied, setLinkCopied] = useState(false);
    const [bookmarkCopied, setBookmarkCopied] = useState(false);
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const readTime = calculateReadTimeFromHtml(safeContent);
    const metaTitle = blog.seo.metaTitle || blog.title;
    const metaDescription = blog.seo.metaDescription || blog.summary || extractTextFromHTML(safeContent, 200);
    const canonicalUrl = normalizedCanonical(blog.seo.canonicalURL || `/blog/${blog.slug}`);
    const ogTitle = blog.seo.openGraph.ogTitle || metaTitle;
    const ogDescription = blog.seo.openGraph.ogDescription || metaDescription;
    const ogType = blog.seo.openGraph.ogType || "article";
    const ogUrl = normalizedCanonical(blog.seo.openGraph.ogUrl || canonicalUrl);
    const ogImage = blog.seo.openGraph.ogImage || blog.seo.metaImage || blog.coverUrl || DEFAULT_OG_IMAGE;
    const robots = blog.seo.metaRobots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const keywords = blog.seo.keywords || "";
    const structuredData = blog.seo.structuredData;
    const metaViewport = blog.seo.metaViewport || "";
    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: ogTitle,
        description: metaDescription,
        image: [ogImage],
        datePublished: blog.publishedAt,
        dateModified: blog.publishedAt,
        mainEntityOfPage: canonicalUrl,
        author: { "@type": "Person", name: blog.author || SITE_NAME },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.png`,
            },
        },
    };

    const parseOptions: HTMLReactParserOptions = {
        replace: (domNode) => {
            const node = domNode as ParsedHtmlNode;

            if (node.type !== "tag" || !node.name) {
                return undefined;
            }

            if (node.name === "img") {
                const source = resolveStrapiAsset(node.attribs?.src ?? "");
                if (!source) return null;

                const altText = node.attribs?.alt ?? "";

                return (
                    <img
                        src={source}
                        alt={altText}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        style={{
                            display: "block",
                            width: "100%",
                            maxWidth: "100%",
                            height: "auto",
                            margin: "3.5rem 0",
                            borderRadius: "0.75rem",
                            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                );
            }

            if (node.name !== "pre") {
                return undefined;
            }

            const codeElement = node.children?.find((child) => child.type === "tag" && child.name === "code");
            const codeText = (codeElement ? collectTextContent(codeElement) : collectTextContent(node))
                .replace(/^\n+/, "")
                .replace(/\n+$/, "");

            if (!codeText) return null;

            const key = codeText.substring(0, 20);
            const language = extractLanguageFromClass(codeElement?.attribs?.class ?? node.attribs?.class);

            return (
                <BlogPreBlock
                    codeText={codeText}
                    copyKey={key}
                    copiedStates={copiedStates}
                    setCopiedStates={setCopiedStates}
                    language={language}
                />
            );
        },
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: blog.title, url: window.location.href });
            } catch {
                return;
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setBookmarkCopied(true);
        setTimeout(() => setBookmarkCopied(false), 2000);
    };

    return (
        <div className="bg-[#F9F9FB] min-h-screen selection:bg-[#E21339] selection:text-white pb-32">
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="robots" content={robots} />
                {keywords ? <meta name="keywords" content={keywords} /> : null}
                {metaViewport ? <meta name="viewport" content={metaViewport} /> : null}
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:type" content={ogType} />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:url" content={ogUrl} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:alt" content={ogTitle} />
                <meta property="article:published_time" content={blog.publishedAt} />
                <meta property="article:modified_time" content={blog.publishedAt} />
                <meta property="article:author" content={blog.author || SITE_NAME} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@pilotup" />
                <meta name="twitter:title" content={ogTitle} />
                <meta name="twitter:description" content={ogDescription} />
                <meta name="twitter:image" content={ogImage} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
                {structuredData ? (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
                ) : null}
            </Head>

            <style dangerouslySetInnerHTML={{ __html: MERRIWEATHER_FONT_IMPORT }} />

            <Navigation />
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E21339] origin-left z-[60]" style={{ scaleX }} />

            <main className="pt-32 px-4 sm:px-6 mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,720px)_1fr] gap-8 max-w-[1400px] mx-auto relative items-start">
                    <div className="hidden lg:block" />

                    <div className="min-w-0">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-left mb-10">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-[#E21339] text-xs font-bold uppercase tracking-[0.2em] font-sans bg-red-50/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-red-100">
                                    Blog Post
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#242424] tracking-tight mb-8 font-sans leading-[1.25] md:leading-[1.25]">
                                {blog.title}
                            </h1>

                            <div className="flex items-center gap-6 text-gray-500 text-sm font-medium font-sans border-b border-gray-200/80 pb-8">
                                <div className="flex items-center gap-2.5">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>{formatDate(blog.publishedAt)}</span>
                                </div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                <div className="flex items-center gap-2.5">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>{readTime} min read</span>
                                </div>
                            </div>
                        </motion.div>

                        {blog.coverUrl ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-xl mb-12 ring-1 ring-black/5"
                            >
                                <img src={blog.coverUrl} alt={blog.title} className="w-full h-full object-cover" />
                            </motion.div>
                        ) : null}

                        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="article-body">
                            {parse(sanitizeBlogHtml(normalizeCodeContent(safeContent)), parseOptions)}
                        </motion.article>
                    </div>

                    <aside className="hidden lg:block h-full">
                        <div className="sticky top-32 flex flex-col gap-6 w-fit ml-6">
                            <div className="flex flex-col items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        void handleShare();
                                    }}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#E21339] hover:border-[#E21339]/30 hover:bg-red-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300"
                                    title="Share Article"
                                >
                                    {linkCopied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        void handleCopyLink();
                                    }}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#E21339] hover:border-[#E21339]/30 hover:bg-red-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300"
                                    title="Copy link"
                                >
                                    {bookmarkCopied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="w-full h-[1px] bg-gray-200 my-1" />

                            <Link
                                href="/blog"
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
                                title="Back to Blog"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </div>
                    </aside>
                </div>

                <div className="lg:hidden mt-20 text-center border-t border-gray-200 pt-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 font-bold hover:text-[#E21339] transition-colors uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to All Posts
                    </Link>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: ARTICLE_BODY_STYLES }} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props & { debug?: string }> = async ({ params, res }) => {
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");

    const slug = typeof params?.slug === "string" ? params.slug : "";
    if (!slug) {
        return { props: { blog: null, debug: `Missing slug param. Params: ${JSON.stringify(params)}` } };
    }

    try {
        if (getBlogSource() === "supabase") {
            const post = await fetchSupabaseBlogPostBySlug(slug);
            if (!post) {
                return { props: { blog: null, debug: `Supabase: No post found for slug '${slug}'` } };
            }

            return {
                props: {
                    blog: {
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        content: post.content || "",
                        summary: post.summary || "",
                        coverUrl: post.cover_url || "",
                        publishedAt: post.updated_at || post.created_at || "",
                        author: "PilotUP",
                        seo: {
                            openGraph: {},
                        },
                    },
                    debug: `Supabase: Loaded post for slug '${slug}'`,
                },
            };
        }

        const post = await fetchBlogPostBySlug(slug);
        if (!post) {
            return { props: { blog: null, debug: `Strapi: No post found for slug '${slug}'` } };
        }

        return {
            props: {
                blog: mapBlogPost(post),
                debug: `Strapi: Loaded post for slug '${slug}'`,
            },
        };
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        console.error(`Failed to fetch blog post for /blog/${slug}:`, error);
        return { props: { blog: null, debug: `Error: ${errMsg}` } };
    }
};
