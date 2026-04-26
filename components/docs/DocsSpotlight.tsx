"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { useRouter } from "next/router";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DocSpotlightItem } from "@/lib/docs";

export type SpotlightDoc = DocSpotlightItem;

const EASE = [0.16, 1, 0.3, 1] as const;
const SHELL_TRANSITION = { duration: 0.5, ease: EASE };
const PANEL_INITIAL = { opacity: 0, y: 0, scale: 1.3 };
const PANEL_REVEAL = { opacity: 1, y: 0, scale: 1 };
const PANEL_EXIT = { opacity: 0, y: 16, scale: 1.2 };

type DocsSpotlightProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SpotlightDoc[];
};

export function DocsSpotlight({ open, onOpenChange, items }: DocsSpotlightProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items.slice(0, 20);
    }
    return items.filter(
      (d) =>
        d.label.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  const goTo = useCallback(
    (slug: string) => {
      onOpenChange(false);
      setQuery("");
      void router.push(`/docs/${slug}`);
    },
    [onOpenChange, router]
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, Math.max(0, filtered.length - 1)));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === "Enter" && filtered[highlight]) {
        e.preventDefault();
        goTo(filtered[highlight].slug);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, highlight, goTo, onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${highlight}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open, filtered.length]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const initial = reduceMotion ? { opacity: 0, y: 0, scale: 1 } : PANEL_INITIAL;
  const panelAnimate = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : PANEL_REVEAL;
  const exit = reduceMotion ? { opacity: 0, y: 0, scale: 1 } : PANEL_EXIT;
  const transition = reduceMotion ? { duration: 0.12 } : SHELL_TRANSITION;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[min(20vh,8rem)] sm:pt-[min(18vh,7rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0.1 } : { duration: 0.32, ease: EASE }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 z-0 cursor-default border-0 bg-black/35 dark:bg-black/50"
            aria-label="Close search"
            onClick={() => onOpenChange(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            className="pointer-events-auto relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.18)] dark:border-[#1f1f1f] dark:bg-[#0b0b0b] dark:text-[#ececec] dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.5)]"
            initial={initial}
            animate={panelAnimate}
            exit={exit}
            transition={transition}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-[#262626]">
              <Search
                className="h-5 w-5 shrink-0 text-slate-400 dark:text-[#8a8a8a]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                ref={inputRef}
                id={labelId}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation"
                className="min-w-0 flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-[#6a6a6a]"
                autoComplete="off"
                spellCheck={false}
                aria-label="Search documentation"
              />
              <kbd className="hidden shrink-0 rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-sans text-[10px] font-medium text-slate-500 sm:inline dark:border-[#2a2a2a] dark:bg-[#141414] dark:text-[#8a8a8a]">
                esc
              </kbd>
            </div>

            {filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-slate-500 dark:text-[#8a8a8a]">
                No results for &ldquo;{query.trim() || "…"}&rdquo;
              </p>
            ) : (
              <ul
                ref={listRef}
                className="max-h-[min(55vh,400px)] overflow-y-auto py-1"
                role="listbox"
                aria-label="Search results"
              >
                {filtered.map((d, i) => {
                  const active = i === highlight;
                  return (
                    <li key={d.slug} role="none">
                      <button
                        type="button"
                        data-idx={i}
                        role="option"
                        aria-selected={active}
                        onClick={() => goTo(d.slug)}
                        onMouseEnter={() => setHighlight(i)}
                        className={[
                          "flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition-colors",
                          active
                            ? "bg-slate-100 text-slate-900 dark:bg-[#161616] dark:text-white"
                            : "text-slate-800 hover:bg-slate-50 dark:text-[#d4d4d4] dark:hover:bg-[#141414]",
                        ].join(" ")}
                      >
                        <FileText
                          className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-[#7a7a7a]"
                          strokeWidth={1.75}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium leading-snug text-slate-900 dark:text-white">{d.label}</span>
                          {d.description ? (
                            <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-[#8a8a8a]">
                              {d.description}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <p className="border-t border-slate-200 px-4 py-2 text-center text-[10px] text-slate-400 dark:border-[#262626] dark:text-[#6a6a6a]">
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 dark:border-[#2a2a2a] dark:bg-[#141414]">↑</kbd>{" "}
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 dark:border-[#2a2a2a] dark:bg-[#141414]">↓</kbd> to navigate
              <span className="mx-2 text-slate-300 dark:text-[#3a3a3a]">·</span>
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1 dark:border-[#2a2a2a] dark:bg-[#141414]">↵</kbd> to open
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
