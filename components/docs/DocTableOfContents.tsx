"use client";

import { useCallback, useEffect, useState } from "react";
import type { DocTocItem } from "@/lib/docHeadings";
import { DOCS_MAIN_SCROLL_ID } from "@/lib/docsScrollRoot";

type DocTableOfContentsProps = {
  items: DocTocItem[];
  /**
   * Where to listen for scroll. Docs use an inner scroll main; most site pages use `window`.
   * @default "docs-main"
   */
  scrollTarget?: "docs-main" | "window";
};

/**
 * "Reading line" from the top of the viewport (px). The active TOC entry is the last
 * heading whose top has scrolled up to/past this line. Using ~40–45% of the window height
 * keeps focus on what’s in the upper-middle of the screen, not right under the top edge.
 */
function getReadingLineY(): number {
  if (typeof window === "undefined") {
    return 160;
  }
  const h = window.innerHeight;
  return Math.max(100, h * 0.42);
}

function computeActiveId(toc: DocTocItem[]): string | null {
  if (toc.length === 0) {
    return null;
  }
  const lineY = getReadingLineY();
  let active: string | null = null;
  for (const { id } of toc) {
    const el = document.getElementById(id);
    if (!el) {
      continue;
    }
    if (el.getBoundingClientRect().top <= lineY) {
      active = id;
    }
  }
  if (active === null) {
    return toc[0]?.id ?? null;
  }
  return active;
}

type TocListInnerProps = {
  items: DocTocItem[];
  activeId: string | null;
  onTocItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
};

/**
 * Sticky in-article table of contents (right column on large screens).
 * Scroll-spy highlights the current section; links scroll smoothly to headings.
 */
export function DocTableOfContents({ items, scrollTarget = "docs-main" }: DocTableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="On this page"
      className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-[#3a3a3a] dark:bg-[#2f2f2f]/50"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-[#8a8a8a]">
        On this page
      </p>
      <DocTocList items={items} scrollTarget={scrollTarget} />
    </nav>
  );
}

function DocTocList({ items, scrollTarget }: { items: DocTocItem[]; scrollTarget: "docs-main" | "window" }) {
  const [activeId, setActiveId] = useState<string | null>(() => items[0]?.id ?? null);

  const updateActive = useCallback(() => {
    setActiveId((prev) => {
      const next = computeActiveId(items);
      return next === prev ? prev : next;
    });
  }, [items]);

  const onTocItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveId(id);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState(null, "", url.toString());
    },
    []
  );

  useEffect(() => {
    setActiveId(computeActiveId(items));
  }, [items]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateActive();
      });
    };

    updateActive();
    const mainEl = scrollTarget === "window" ? null : document.getElementById(DOCS_MAIN_SCROLL_ID);
    const el: HTMLElement | Window = mainEl ?? window;
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", updateActive);
    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [updateActive, scrollTarget]);

  return <TocListInner items={items} activeId={activeId} onTocItemClick={onTocItemClick} />;
}

function TocListInner({ items, activeId, onTocItemClick }: TocListInnerProps) {
  return (
    <ul className="mt-3 space-y-1.5 text-[13px]">
      {items.map((item) => {
        const pad = Math.max(0, (item.level - 2) * 10);
        const isActive = item.id === activeId;
        return (
          <li key={item.id} style={{ paddingLeft: pad }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => onTocItemClick(e, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={[
                "block break-words border-l-2 pl-2.5 leading-snug -ml-px transition",
                isActive
                  ? "border-[rgb(252,94,86)] font-medium text-slate-900 dark:text-white"
                  : "border-transparent text-slate-600 hover:text-slate-900 dark:text-[#a3a3a3] dark:hover:text-white",
              ].join(" ")}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
