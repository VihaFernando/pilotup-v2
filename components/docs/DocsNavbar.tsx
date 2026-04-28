"use client";

import { useId } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Search, Sun } from "lucide-react";

type DocsNavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSpotlight: () => void;
};

export function DocsNavbar({ isDark, onToggleTheme, onOpenSpotlight }: DocsNavbarProps) {
  const searchPillId = useId();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/80 backdrop-blur-md dark:border-[#3d3d3d] dark:bg-[#2b2b2b]/95">
      <div className="grid h-16 w-full [grid-template-columns:minmax(0,auto)_1fr_minmax(0,auto)] items-center gap-2 px-5 sm:gap-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center justify-self-start gap-2 outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgb(252,94,86)]/40"
          aria-label="PilotUP home"
        >
          <img
            src="/brand-assets/svg/full-logo-dark.svg"
            alt="PilotUP"
            className="h-14 w-auto max-w-[220px] object-contain object-left dark:hidden sm:h-[3.75rem] sm:max-w-[260px]"
          />
          <img
            src="/brand-assets/svg/full-logo-light.svg"
            alt=""
            className="hidden h-9 w-auto max-w-[180px] object-contain object-left dark:block sm:h-10 sm:max-w-[220px]"
            aria-hidden
          />
          <span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:border-[#4a4a4a] dark:bg-[#363636] dark:text-[#c4c4c4]">
            docs
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-center self-center justify-self-stretch px-1 sm:px-3">
          <motion.button
            type="button"
            onClick={onOpenSpotlight}
            whileTap={{ scale: 0.96 }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50/80 text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 dark:border-[#4a4a4a] dark:bg-[#363636] dark:text-[#9a9a9a] dark:hover:border-[#5a5a5a] dark:hover:bg-[#3a3a3a] dark:hover:text-[#e0e0e0] dark:focus-visible:ring-[#555555]/50 sm:hidden"
            aria-label="Search documentation"
          >
            <Search className="h-4 w-4" strokeWidth={2} />
          </motion.button>

          <div className="hidden w-full min-w-0 max-w-md sm:block">
            <label htmlFor={searchPillId} className="sr-only">
              Search documentation
            </label>
            <button
              type="button"
              id={searchPillId}
              onClick={onOpenSpotlight}
              className="group flex h-9 w-full min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3 text-left transition hover:border-slate-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 dark:border-[#4a4a4a] dark:bg-[#363636] dark:hover:border-[#5a5a5a] dark:hover:bg-[#3a3a3a] dark:focus-visible:ring-[#555555]/50"
            >
              <Search className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600 dark:text-[#9a9a9a] dark:group-hover:text-[#c4c4c4]" />
              <span className="min-w-0 flex-1 text-sm text-slate-400 dark:text-[#8a8a8a]">Search documentation</span>
              <kbd className="shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-medium text-slate-500 dark:border-[#4a4a4a] dark:bg-[#333333] dark:text-[#a3a3a3]">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1 justify-self-end sm:gap-2">
          <Link
            href="/waitlist"
            className="hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:inline dark:text-[#c4c4c4] dark:hover:bg-[#363636] dark:hover:text-white"
          >
            Join waitlist
          </Link>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-[#4a4a4a] dark:bg-[#333333] dark:text-[#d4d4d4] dark:hover:bg-[#3d3d3d] dark:hover:text-white"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
