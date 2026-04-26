"use client";

import parse, { HTMLReactParserOptions } from "html-react-parser";
import BlogPreBlock from "@/components/BlogPreBlock";
import { DocEmbedIframe } from "@/components/docs/DocEmbedIframe";
import { resolveStrapiAsset } from "@/lib/blog";
import { hashContent } from "@/lib/hashContent";
import { sanitizeBlogHtml } from "@/lib/sanitizeBlogHtml";
import { useState } from "react";

type ParsedHtmlNode = {
  type?: string;
  name?: string;
  data?: string;
  attribs?: Record<string, string>;
  children?: ParsedHtmlNode[];
};

function collectTextContent(node?: ParsedHtmlNode): string {
  if (!node) {
    return "";
  }
  if (node.type === "text") {
    return node.data ?? "";
  }
  if (!Array.isArray(node.children) || node.children.length === 0) {
    return "";
  }
  return node.children.map((child) => collectTextContent(child)).join("");
}

function extractLanguageFromClass(className?: string): string | undefined {
  if (!className) {
    return undefined;
  }
  const match = className.match(/language-([a-z0-9_+-]+)/i);
  return match?.[1];
}

type DocBodyProps = {
  html: string;
};

/**
 * Renders documentation HTML (from Strapi) with light styling parity to the rest of the site.
 */
export function DocBody({ html }: DocBodyProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const safe = typeof html === "string" ? html : "";
  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      const node = domNode as ParsedHtmlNode;

      if (node.type !== "tag" || !node.name) {
        return undefined;
      }

      if (node.name === "img") {
        const source = resolveStrapiAsset(node.attribs?.src ?? "");
        if (!source) {
          return null;
        }
        const altText = node.attribs?.alt ?? "";
        return (
          <img
            key={`img-${hashContent(source + altText)}`}
            src={source}
            alt={altText}
            loading="lazy"
            decoding="async"
            className="my-6 block max-w-full rounded-lg border border-slate-200/80 dark:border-[#4a4a4a] mx-auto"
          />
        );
      }

      if (node.name === "iframe") {
        const a = node.attribs ?? {};
        const src = a.src?.trim() ?? "";
        if (!src) {
          return null;
        }
        const srcNorm = src.startsWith("//") ? `https:${src}` : src;
        return (
          <DocEmbedIframe
            key={`embed-${hashContent(srcNorm)}`}
            src={srcNorm}
            title={a.title || "Embedded video"}
            allow={a.allow}
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

      if (!codeText) {
        return null;
      }

      const key = codeText.substring(0, 24);
      const language = extractLanguageFromClass(codeElement?.attribs?.class ?? node.attribs?.class);
      const blockKey = `pre-${hashContent(codeText)}`;

      return (
        <BlogPreBlock
          key={blockKey}
          codeText={codeText}
          copyKey={key}
          copiedStates={copiedStates}
          setCopiedStates={setCopiedStates}
          language={language}
        />
      );
    },
  };

  return (
    <article
      suppressHydrationWarning
      className={[
        "w-full max-w-none",
        "text-base leading-7 text-slate-600 dark:text-[#c4c4c4]",
        "[&_h1]:scroll-mt-24 [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_h4]:scroll-mt-24 [&_h5]:scroll-mt-24 [&_h6]:scroll-mt-24",
        "[&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-slate-900 dark:[&_h1]:text-white",
        "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white",
        "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 dark:[&_h3]:text-white",
        "[&_p]:mb-4",
        "[&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc",
        "[&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal",
        "[&_li]:mb-1.5",
        "[&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-500 dark:[&_blockquote]:border-[#4a4a4a] dark:[&_blockquote]:text-[#9a9a9a]",
        "[&_a]:font-medium [&_a]:text-[rgb(252,94,86)] [&_a]:underline-offset-2 hover:[&_a]:underline",
        "[&_figure]:my-6 [&_figure]:mx-auto [&_figure]:max-w-full [&_figure]:text-center",
        "[&_figure_img]:mx-auto [&_figure_img]:block [&_figure_img]:w-full [&_figure_img]:max-w-full",
      ].join(" ")}
    >
      {parse(sanitizeBlogHtml(safe), parseOptions)}
    </article>
  );
}
