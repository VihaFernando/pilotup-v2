"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DocArticleNav } from "@/components/docs/DocArticleNav";
import { DocBody } from "@/components/docs/DocBody";
import { DocTableOfContents } from "@/components/docs/DocTableOfContents";
import { DocsNavbar } from "@/components/docs/DocsNavbar";
import { DocsSidebar, type DocsSidebarCategory } from "@/components/docs/DocsSidebar";
import { DocsSpotlight } from "@/components/docs/DocsSpotlight";
import { DOCS_MAIN_SCROLL_ID } from "@/lib/docsScrollRoot";
import { hashContent } from "@/lib/hashContent";
import type { DocNavLink, DocTocItem } from "@/lib/docHeadings";
import type { DocSpotlightItem } from "@/lib/docs";

type DocsPageShellProps = {
  categories: DocsSidebarCategory[];
  activeSlug: string;
  docTitle: string;
  /** Short intro under the title. */
  docDescription: string;
  contentHtml: string;
  toc: DocTocItem[];
  prevDoc: DocNavLink | null;
  nextDoc: DocNavLink | null;
  spotlightItems: DocSpotlightItem[];
};

export function DocsPageShell({
  categories,
  activeSlug,
  docTitle,
  docDescription,
  contentHtml,
  toc,
  prevDoc,
  nextDoc,
  spotlightItems,
}: DocsPageShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("pilotup-docs-theme");
    const shouldUseDark = saved !== "light";
    setIsDark(shouldUseDark);
    // Keep <html> in sync for portal-like UI and :root dark, on top of the shell’s own .dark class.
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const main = document.getElementById(DOCS_MAIN_SCROLL_ID);
    if (main) {
      main.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [activeSlug]);

  const toggleTheme = useCallback(() => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("pilotup-docs-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  const categoryLabel = useMemo(() => {
    const found = categories.find((c) => c.links.some((l) => l.slug === activeSlug));
    return found?.title ?? null;
  }, [categories, activeSlug]);

  return (
    <div
      className={[
        "flex h-dvh max-h-dvh flex-col overflow-hidden bg-white text-slate-900 antialiased transition-colors duration-300 dark:bg-[#2b2b2b] dark:text-[#ececec]",
        isDark ? "dark" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <DocsSpotlight
        open={spotlightOpen}
        onOpenChange={setSpotlightOpen}
        items={spotlightItems}
      />
      <DocsNavbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenSpotlight={() => setSpotlightOpen(true)}
      />

      <div className="mx-auto flex min-h-0 w-full flex-1 overflow-hidden">
        <div className="hidden h-full min-h-0 w-[280px] shrink-0 overflow-hidden lg:block">
          <DocsSidebar categories={categories} activeSlug={activeSlug} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="z-30 flex shrink-0 items-center justify-between border-b border-slate-200/90 bg-white/90 px-4 py-2.5 backdrop-blur-md lg:hidden dark:border-[#3d3d3d] dark:bg-[#2b2b2b]/90">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/brand-assets/svg/full-logo-dark.svg"
                alt="PilotUP"
                className="h-8 w-auto max-w-[160px] object-contain object-left dark:hidden sm:h-9 sm:max-w-[200px]"
              />
              <img
                src="/brand-assets/svg/full-logo-light.svg"
                alt=""
                className="hidden h-8 w-auto max-w-[160px] object-contain object-left dark:block sm:h-9 sm:max-w-[200px]"
                aria-hidden
              />
              <span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-600 dark:border-[#4a4a4a] dark:bg-[#363636] dark:text-[#c4c4c4]">
                docs
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-[#4a4a4a] dark:bg-[#333333] dark:text-[#e0e0e0] dark:hover:bg-[#3a3a3a]"
            >
              <Menu className="h-4 w-4" />
              Menu
            </button>
          </div>

          <AnimatePresence>
            {mobileSidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0.98 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -16, opacity: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  className="h-full w-[min(100%,300px)] bg-white shadow-2xl dark:bg-[#2b2b2b]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end border-b border-slate-200 p-2 dark:border-[#3d3d3d]">
                    <button
                      type="button"
                      onClick={() => setMobileSidebarOpen(false)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-[#4a4a4a] dark:text-[#c4c4c4]"
                      aria-label="Close menu"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="h-[calc(100%-3rem)] overflow-y-auto">
                    <DocsSidebar
                      categories={categories}
                      activeSlug={activeSlug}
                      onItemClick={() => setMobileSidebarOpen(false)}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <main
            id={DOCS_MAIN_SCROLL_ID}
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-10 lg:flex-row lg:items-start">
              <div className="min-w-0 flex-1">
                {categoryLabel ? (
                  <p className="mb-1.5 text-sm font-semibold tracking-wide text-[rgb(252,94,86)]">
                    {categoryLabel}
                  </p>
                ) : null}
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-[2.35rem] sm:leading-tight dark:text-white">
                  {docTitle}
                </h1>
                {docDescription ? (
                  <p className="mt-3 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 dark:text-[#a8a8a8]">
                    {docDescription}
                  </p>
                ) : null}
                <div className="mt-6 lg:mt-8">
                  <DocBody key={hashContent(contentHtml)} html={contentHtml} />
                </div>
                <div className="max-w-3xl">
                  <DocArticleNav prev={prevDoc} next={nextDoc} />
                </div>
              </div>
              <aside className="hidden w-full min-w-0 shrink-0 overflow-y-auto lg:sticky lg:top-0 lg:block lg:max-h-[calc(100dvh-4.5rem)] lg:w-56 lg:self-start 2xl:w-64">
                <DocTableOfContents items={toc} />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
