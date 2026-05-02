"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, LayoutGroup } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { LegalDocument } from "@/lib/legal/types";

const SCROLL_OFFSET = 140;

type Props = {
  document: LegalDocument;
};

export function LegalDocumentView({ document: doc }: Props) {
  const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "");

  useEffect(() => {
    const ids = doc.sections.map((s) => s.id);

    const updateActive = () => {
      const y = window.scrollY + SCROLL_OFFSET;
      let current = ids[0] ?? "";
      for (const s of doc.sections) {
        const el = document.getElementById(s.id);
        if (!el) {
          continue;
        }
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) {
          current = s.id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [doc.sections]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt">
      <Navigation />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 md:px-8">
        <header className="mb-10 max-w-3xl text-left sm:mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl md:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-brand-textMuted sm:text-base">Last updated: {doc.lastUpdated}</p>
        </header>

        {/* Mobile: compact on-this-page list */}
        <nav
          className="mb-8 lg:hidden"
          aria-label="On this page"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-textMuted">On this page</p>
          <ol className="mt-2 flex max-h-40 flex-col gap-1 overflow-y-auto rounded-xl border border-brand-border/80 bg-white p-3 text-left">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  className={[
                    "w-full rounded-md px-2 py-1.5 text-left text-sm transition",
                    activeId === s.id
                      ? "bg-brand-primaryAccent/8 font-medium text-brand-text"
                      : "text-brand-textMuted hover:bg-brand-surface-alt hover:text-brand-text",
                  ].join(" ")}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr),minmax(200px,260px)] lg:items-start lg:gap-16 xl:gap-20">
          <article className="min-w-0 max-w-3xl text-left">
            {doc.lead ? (
              <p className="text-base font-normal leading-relaxed text-brand-textMuted">{doc.lead}</p>
            ) : null}

            {doc.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className={["scroll-mt-28", i > 0 || doc.lead ? "mt-10 sm:mt-12" : "mt-8 sm:mt-10"].join(" ")}
              >
                <h2 className="text-lg font-medium text-brand-text sm:text-xl">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm font-normal leading-relaxed text-brand-textMuted sm:text-base sm:leading-[1.7]">
                  {section.paragraphs.map((p, pi) => (
                    <p key={`${section.id}-${pi}`}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <p className="mt-12 border-t border-brand-border/80 pt-8 text-sm text-brand-textMuted">
              {doc.path === "/terms" ? (
                <>
                  For how we handle personal data, see our{" "}
                  <Link href="/privacy" className="font-medium text-brand-primaryAccent hover:underline">
                    Privacy policy
                  </Link>
                  .
                </>
              ) : (
                <>
                  For rules governing use of the product, see our{" "}
                  <Link href="/terms" className="font-medium text-brand-primaryAccent hover:underline">
                    Terms & conditions
                  </Link>
                  .
                </>
              )}
            </p>
          </article>

          <aside
            className="sticky top-28 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto text-left lg:block"
            aria-label="On this page"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-textMuted">On this page</p>
            <LayoutGroup>
              <nav className="relative mt-3 border-l border-brand-border/90 pl-0">
                {doc.sections.map((s) => {
                  const isActive = activeId === s.id;
                  return (
                    <div key={s.id} className="relative">
                      <button
                        type="button"
                        onClick={() => scrollToId(s.id)}
                        className={[
                          "relative block w-full py-1.5 pl-4 pr-1 text-left text-sm transition",
                          isActive
                            ? "font-medium text-brand-text"
                            : "text-brand-textMuted hover:text-brand-text",
                        ].join(" ")}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="legal-toc-active"
                            className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand-primaryAccent"
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          />
                        ) : null}
                        <span className="relative z-10 leading-snug">{s.title}</span>
                      </button>
                    </div>
                  );
                })}
              </nav>
            </LayoutGroup>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
