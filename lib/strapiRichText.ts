import { resolveStrapiAsset } from "@/lib/blog";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function imageBlockUrl(image: any): string | null {
  if (!image) return null;
  if (typeof image === "string") return resolveStrapiAsset(image) || null;
  const u =
    image.url ??
    image.data?.attributes?.url ??
    image.data?.url ??
    (Array.isArray(image.data) ? image.data[0]?.attributes?.url ?? image.data[0]?.url : undefined);
  if (!u) return null;
  return resolveStrapiAsset(typeof u === "string" ? u : u.url ?? u);
}

/**
 * Renders Strapi 4+ rich text blocks to HTML. Supports inline links, lists, code, and images.
 */
function blocksToHtml(blocks: any[]): string {
  const renderInline = (children: any[] = []): string => {
    if (!Array.isArray(children)) {
      return "";
    }
    return children
      .map((child) => {
        if (child == null) {
          return "";
        }
        if (child.type === "link" && (child.url || child.href)) {
          const url = String(child.url || child.href || "");
          const inner = Array.isArray(child.children) ? renderInline(child.children) : "";
          if (!url) {
            return inner;
          }
          return `<a href="${escapeHtml(url)}" rel="noopener noreferrer" target="_blank">${inner}</a>`;
        }
        const text = String(child.text ?? "");
        if (child.code) {
          return `<code>${escapeHtml(text)}</code>`;
        }
        if (child.bold) {
          return `<strong>${escapeHtml(text)}</strong>`;
        }
        if (child.italic) {
          return `<em>${escapeHtml(text)}</em>`;
        }
        if (child.underline) {
          return `<u>${escapeHtml(text)}</u>`;
        }
        return escapeHtml(text);
      })
      .join("");
  };

  return blocks
    .map((block) => {
      const type = block?.type;
      if (type === "paragraph") {
        return `<p>${renderInline(block?.children)}</p>`;
      }
      if (type === "heading") {
        const level = Math.min(6, Math.max(1, Number(block?.level) || 2));
        return `<h${level}>${renderInline(block?.children)}</h${level}>`;
      }
      if (type === "quote") {
        return `<blockquote>${renderInline(block?.children)}</blockquote>`;
      }
      if (type === "list") {
        const tag = block?.format === "ordered" ? "ol" : "ul";
        const listItemContent = (item: any): string => {
          const kids = item?.children;
          if (!Array.isArray(kids)) {
            return renderInline([]);
          }
          return kids
            .map((c: any) => {
              if (c?.type === "paragraph") {
                return renderInline(c?.children);
              }
              if (c?.type === "list") {
                return blocksToHtml([c]);
              }
              return renderInline(c?.type === "text" || c?.text != null ? [c] : c?.children ?? []);
            })
            .join("");
        };
        const items = Array.isArray(block?.children)
          ? block.children
              .map((item: any) => {
                if (item?.type === "list-item") {
                  return `<li>${listItemContent(item) || renderInline(item?.children)}</li>`;
                }
                return `<li>${listItemContent({ children: [item] })}</li>`;
              })
              .join("")
          : "";
        return `<${tag}>${items}</${tag}>`;
      }
      if (type === "code") {
        return `<pre><code>${escapeHtml(String(block?.code ?? ""))}</code></pre>`;
      }
      if (type === "image") {
        const src = imageBlockUrl(block?.image);
        if (!src) {
          return "";
        }
        const alt = String(
          block?.image?.alternativeText ?? block?.alternativeText ?? block?.image?.data?.attributes?.alternativeText ?? ""
        );
        return `<figure><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" /></figure>`;
      }
      return renderInline(block?.children || []);
    })
    .join("\n");
}

/**
 * Strapi "Rich text" (blocks) or a raw HTML / markdown string from the API.
 */
export function strapiRichTextToHtml(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return blocksToHtml(content);
  }
  return "";
}
