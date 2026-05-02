"use client";

import Link from "next/link";
import { FileText, LifeBuoy, UsersRound } from "lucide-react";

const PILOTUP_COMMUNITY_WHATSAPP = "https://chat.whatsapp.com/CxYbPL59EswKY9P7NKXfUO";

const SUPPORT_MAILTO = (() => {
  const p = new URLSearchParams();
  p.set("subject", "Requesting support with : [ENTER WHERE YOU NEED SUPPORT FROM]");
  p.set("body", ["[DESCRIBE YOUR ISSUE HERE]", "", "Thanks"].join("\n"));
  return `mailto:support@pilotup.io?${p.toString()}`;
})();

export type DocsSidebarLink = {
  label: string;
  slug: string;
};

export type DocsSidebarCategory = {
  title: string;
  links: DocsSidebarLink[];
};

type DocsSidebarProps = {
  categories: DocsSidebarCategory[];
  activeSlug: string;
  onItemClick?: () => void;
};

export function DocsSidebar({ categories, activeSlug, onItemClick }: DocsSidebarProps) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200/90 bg-white dark:border-[#3d3d3d] dark:bg-[#2b2b2b]">
      <div className="shrink-0 border-b border-slate-200/90 px-4 py-4 dark:border-[#3d3d3d] sm:px-5 sm:py-5">
        <div className="flex flex-col gap-0.5">
          <a
            href={PILOTUP_COMMUNITY_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onItemClick}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-[#b0b0b0] dark:hover:text-white"
          >
            <UsersRound className="h-4 w-4 shrink-0 text-slate-500 dark:text-[#9a9a9a]" strokeWidth={1.75} aria-hidden />
            Join community
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
          <a
            href={SUPPORT_MAILTO}
            onClick={onItemClick}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-[#b0b0b0] dark:hover:text-white"
          >
            <LifeBuoy className="h-4 w-4 shrink-0 text-slate-500 dark:text-[#9a9a9a]" strokeWidth={1.75} aria-hidden />
            Contact support
          </a>
        </div>
      </div>
      <nav aria-label="Documentation navigation" className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.title}>
              <p className="mb-2.5 px-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-[#8a8a8a]">
                {category.title}
              </p>
              <ul className="space-y-0.5">
                {category.links.map((link) => {
                  const isActive = activeSlug === link.slug;
                  return (
                    <li key={link.slug}>
                      <Link
                        href={`/docs/${link.slug}`}
                        onClick={onItemClick}
                        className={[
                          "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition duration-200",
                          isActive
                            ? "bg-slate-100 text-slate-900 dark:bg-[#3d3d3d] dark:text-[#f0f0f0]"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-[#b0b0b0] dark:hover:bg-[#353535] dark:hover:text-[#f0f0f0]",
                        ].join(" ")}
                      >
                        {isActive ? (
                          <span className="absolute inset-0 -z-10 rounded-lg bg-slate-100 dark:bg-[#3d3d3d]" />
                        ) : null}
                        <FileText
                          className="relative h-4 w-4 shrink-0 text-slate-500 group-hover:text-slate-700 dark:text-[#9a9a9a] dark:group-hover:text-[#d4d4d4]"
                          strokeWidth={1.75}
                        />
                        <span className="relative">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
