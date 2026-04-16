import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Calendar, ArrowLeft, Share2, Clock, Check, Copy } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Navigation } from "@/components/Navigation";
import { fetchSupabaseBlogPostBySlug, type SupabaseBlogPost } from "@/lib/supabaseBlog";
import { extractTextFromHTML, formatDate } from "@/lib/blog";
import { ARTICLE_BODY_STYLES, MERRIWEATHER_FONT_IMPORT } from "@/lib/articleStyles";

declare global {
    interface Window {
        prerenderReady?: boolean;
    }
}

function calculateReadTimeFromContent(content: string): number {
    return Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, "").split(" ").length / 250));
}

export function SupabaseBlogDetail() {
    const router = useRouter();
    const slug = typeof router.query.slug === "string" ? router.query.slug : "";
    const [blog, setBlog] = useState<SupabaseBlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [linkCopied, setLinkCopied] = useState(false);
    const [bookmarkCopied, setBookmarkCopied] = useState(false);
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        if (typeof window !== "undefined") window.prerenderReady = false;

        const fetchBlog = async () => {
            try {
                if (!slug) return;
                const post = await fetchSupabaseBlogPostBySlug(slug);
                setBlog(post);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                if (typeof window !== "undefined") window.prerenderReady = true;
            }
        };

        void fetchBlog();
    }, [slug]);

    const parseOptions = {
        replace: (domNode: any) => {
            if (domNode.name === "pre") {
                let codeText = "";
                if (domNode.children && domNode.children.length > 0) {
                    const codeElement = domNode.children.find((child: any) => child.name === "code");
                    if (codeElement && codeElement.children.length > 0) {
                        codeText = codeElement.children[0].data;
                    } else {
                        codeText = domNode.children[0].data;
                    }
                }

                if (!codeText) return null;

                const handleCopyCode = (text: string) => {
                    navigator.clipboard.writeText(text);
                    const key = text.substring(0, 20);
                    setCopiedStates((prev) => ({ ...prev, [key]: true }));
                    setTimeout(() => setCopiedStates((prev) => ({ ...prev, [key]: false })), 2000);
                };
                const key = codeText.substring(0, 20);

                return (
                    <div className="my-10 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-[#333] group max-w-[calc(100vw-2rem)] sm:max-w-full mx-auto font-sans">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#111]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleCopyCode(codeText)}
                                className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 font-sans"
                            >
                                {copiedStates[key] ? (
                                    <span className="text-green-400 font-medium flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Copied
                                    </span>
                                ) : (
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy Code</span>
                                )}
                            </button>
                        </div>

                        <div className="overflow-x-auto w-full">
                            <SyntaxHighlighter
                                language="javascript"
                                style={vscDarkPlus}
                                showLineNumbers={true}
                                wrapLines={false}
                                customStyle={{
                                    margin: 0,
                                    padding: "1.5rem",
                                    background: "transparent",
                                    fontSize: "0.9rem",
                                    lineHeight: "1.6",
                                    fontFamily: "'SF Mono', 'JetBrains Mono', 'Fira Code', monospace",
                                    minWidth: "100%",
                                }}
                                lineNumberStyle={{
                                    minWidth: "2.5em",
                                    paddingRight: "1em",
                                    color: "#6e7681",
                                    textAlign: "right",
                                    userSelect: "none",
                                }}
                            >
                                {codeText}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                );
            }
        },
    };

    const handleShare = async () => {
        if (blog && navigator.share) {
            try {
                await navigator.share({ title: blog.title, url: window.location.href });
            } catch {
                return;
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setBookmarkCopied(true);
        setTimeout(() => setBookmarkCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="bg-[#F9F9FB] min-h-screen selection:bg-[#E21339] selection:text-white pb-32">
                <Navigation />
                <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E21339] origin-left z-[60]" style={{ scaleX }} />
                <main className="pt-32 px-4 sm:px-6 mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(auto,720px)_1fr] gap-8 max-w-[1400px] mx-auto relative items-start">
                        <div className="hidden lg:block" />
                        <div className="min-w-0">
                            <div className="text-left mb-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-[#E21339] text-xs font-bold uppercase tracking-[0.2em] font-sans bg-red-50/80 px-4 py-1.5 rounded-full backdrop-blur-sm border border-red-100">
                                        Blog Post
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#242424] tracking-tight mb-8 font-sans leading-[1.25] md:leading-[1.25]">
                                    Loading article...
                                </h1>
                                <div className="flex items-center gap-6 text-gray-500 text-sm font-medium font-sans border-b border-gray-200/80 pb-8">
                                    <div className="flex items-center gap-2.5">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>Loading date...</span>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <div className="flex items-center gap-2.5">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>Calculating read time...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="hidden lg:block h-full">
                            <div className="sticky top-32 flex flex-col gap-6 w-fit ml-6">
                                <div className="flex flex-col items-center gap-3">
                                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 transition-all shadow-sm" disabled title="Share Article">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 transition-all shadow-sm" disabled title="Copy link">
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="w-full h-[1px] bg-gray-200 my-1" />
                                <button
                                    onClick={() => router.push("/blog")}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
                                    title="Back to Blog"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            </div>
                        </aside>
                    </div>

                    <div className="lg:hidden mt-20 text-center border-t border-gray-200 pt-10">
                        <button onClick={() => router.push("/blog")} className="inline-flex items-center gap-2 text-sm text-gray-600 font-bold hover:text-[#E21339] transition-colors uppercase tracking-wider">
                            <ArrowLeft className="w-4 h-4" /> Back to All Posts
                        </button>
                    </div>
                </main>

                <style dangerouslySetInnerHTML={{ __html: ARTICLE_BODY_STYLES }} />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#F9F9FB]">
                <Navigation />
                <main className="pt-32 px-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Blog not found</h1>
                    <Link href="/blog" className="text-[#E21339] font-semibold mt-4 inline-block">Back to blog</Link>
                </main>
            </div>
        );
    }

    const readTime = calculateReadTimeFromContent(blog.content);
    const metaDescription = blog.summary || extractTextFromHTML(blog.content, 200);

    return (
        <div className="bg-[#F9F9FB] min-h-screen selection:bg-[#E21339] selection:text-white pb-32">
            <Head>
                <title>{blog.title}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={`/blog/${blog.slug}`} />
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
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#242424] tracking-tight mb-8 font-sans leading-[1.25] md:leading-[1.25]">{blog.title}</h1>
                            <div className="flex items-center gap-6 text-gray-500 text-sm font-medium font-sans border-b border-gray-200/80 pb-8">
                                <div className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-gray-400" /><span>{formatDate(blog.created_at)}</span></div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-gray-400" /><span>{readTime} min read</span></div>
                            </div>
                        </motion.div>

                        {blog.cover_url ? (
                            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-xl mb-12 ring-1 ring-black/5">
                                <img src={blog.cover_url} alt={blog.title} className="w-full h-full object-cover" />
                            </motion.div>
                        ) : null}

                        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="article-body">
                            {parse(sanitizeHtml(blog.content), parseOptions as any)}
                        </motion.article>
                    </div>

                    <aside className="hidden lg:block h-full">
                        <div className="sticky top-32 flex flex-col gap-6 w-fit ml-6">
                            <div className="flex flex-col items-center gap-3">
                                <button type="button" onClick={() => void handleShare()} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#E21339] hover:border-[#E21339]/30 hover:bg-red-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300" title="Share Article">
                                    {linkCopied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                                </button>
                                <button type="button" onClick={() => void handleCopyLink()} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-[#E21339] hover:border-[#E21339]/30 hover:bg-red-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300" title="Copy link">
                                    {bookmarkCopied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="w-full h-[1px] bg-gray-200 my-1" />
                            <Link href="/blog" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-gray-400 transition-all shadow-sm hover:shadow-md" title="Back to Blog">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </div>
                    </aside>
                </div>
                <div className="lg:hidden mt-20 text-center border-t border-gray-200 pt-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-600 font-bold hover:text-[#E21339] transition-colors uppercase tracking-wider">
                        <ArrowLeft className="w-4 h-4" /> Back to All Posts
                    </Link>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: ARTICLE_BODY_STYLES }} />
        </div>
    );
}
