"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Package } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  isChangelogTag,
  type ChangelogEntry,
  TAG_LABEL,
  TAG_STYLES,
  UNKNOWN_TAG_CLASS,
} from "@/lib/changelog";

const COLLAPSED_MAX_PX = 280;
const EASE = [0.25, 0.1, 0.25, 1] as const;

function formatDateLabel(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

const CHANGELOG_RICH: string = [
  "changelog-rich mt-3 text-sm leading-relaxed text-brand-textMuted sm:text-base",
  "[&_p]:mb-3 [&_p]:last:mb-0",
  "[&_ul]:mb-3 [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:mb-3 [&_ol]:ml-4 [&_ol]:list-decimal",
  "[&_li]:mb-1.5",
  "[&_a]:font-medium [&_a]:text-[rgb(252,94,86)] [&_a]:underline-offset-2 hover:[&_a]:underline",
  "[&_strong]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-brand-text",
  "[&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:text-[0.9em] dark:[&_code]:bg-white/10",
  "[&_pre]:my-2 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/5 [&_pre]:p-3 dark:[&_pre]:bg-white/5",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-brand-border [&_blockquote]:pl-3 [&_blockquote]:italic",
].join(" ");

const GRADIENT =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-brand-surface via-brand-surface/90 to-transparent dark:from-zinc-950 dark:via-zinc-950/90";

function ChangelogReleaseNotes({ html, entryId }: { html: string; entryId: string }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [fullH, setFullH] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const measure = useCallback(() => {
    const el = innerRef.current;
    if (!el) {
      return;
    }
    setFullH(el.scrollHeight);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [html, measure]);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [html, measure]);

  const needsClamp = fullH > COLLAPSED_MAX_PX;
  const collapsedH = needsClamp ? COLLAPSED_MAX_PX : fullH;
  const targetH = expanded || !needsClamp ? fullH : collapsedH;

  return (
    <div className="relative mt-3">
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{
          maxHeight: fullH > 0 ? targetH : COLLAPSED_MAX_PX,
        }}
        transition={{
          maxHeight: { duration: 0.5, ease: EASE },
        }}
      >
        <div
          ref={innerRef}
          className={CHANGELOG_RICH}
          id={`release-notes-${entryId}`}
          // eslint-disable-next-line react/no-danger -- sanitized in getServerSideProps
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </motion.div>

      <AnimatePresence>
        {needsClamp && !expanded ? (
          <motion.div
            key="shim"
            className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-stretch"
            initial={false}
            exit={{ opacity: 0, transition: { duration: 0.22, ease: EASE } }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className={GRADIENT} aria-hidden />
            <div className="pointer-events-auto relative z-[3] flex justify-center pb-1 pt-6">
              <motion.button
                type="button"
                className="group/btn inline-flex items-center gap-1.5 rounded-full border border-brand-border/90 bg-brand-surface/95 px-4 py-2 text-sm font-semibold text-brand-text shadow-sm backdrop-blur-sm transition hover:border-brand-border hover:bg-brand-surface dark:border-white/10 dark:bg-zinc-900/90 dark:text-white dark:hover:bg-zinc-800"
                onClick={() => setExpanded(true)}
                aria-expanded={false}
                aria-controls={`release-notes-${entryId}`}
              >
                View more
                <ChevronDown className="h-4 w-4 opacity-70 transition group-hover/btn:translate-y-0.5" strokeWidth={2} />
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {needsClamp && expanded ? (
          <motion.div
            key="less"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-3 flex justify-center"
          >
            <button
              type="button"
              className="text-sm font-medium text-[rgb(252,94,86)] underline-offset-2 transition hover:underline"
              onClick={() => setExpanded(false)}
              aria-expanded
              aria-controls={`release-notes-${entryId}`}
            >
              Show less
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <div className="group rounded-2xl border border-brand-border/80 bg-brand-surface p-4 transition hover:border-brand-border sm:p-6">
      {entry.version ? (
        <div className="mb-2 sm:mb-3">
          <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-brand-border/90 bg-brand-surface-alt/80 px-2 py-0.5 text-[11px] font-medium text-brand-text sm:text-xs">
            <Package className="h-3 w-3 shrink-0 opacity-70" />
            v{entry.version}
          </span>
        </div>
      ) : null}

      <h2 className="break-words text-base font-semibold tracking-tight text-brand-text sm:text-lg md:text-xl">
        {entry.title}
      </h2>

      {entry.bodyHtml ? <ChangelogReleaseNotes html={entry.bodyHtml} entryId={entry.id} /> : null}

      {entry.tags && entry.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
          {entry.tags.map((tag, i) => {
            const known = isChangelogTag(tag);
            const cls = known ? TAG_STYLES[tag] : UNKNOWN_TAG_CLASS;
            const label = known ? TAG_LABEL[tag] : tag;
            return (
              <span
                key={`${entry.id}-tag-${i}-${tag}`}
                className={[
                  "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]",
                  cls,
                ].join(" ")}
              >
                {label}
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

const motionView = { once: true as const, margin: "-24px" as const };

type ChangelogTimelineProps = {
  entries: ChangelogEntry[];
};

export function ChangelogTimeline({ entries }: ChangelogTimelineProps) {
  return (
    <div className="relative w-full min-w-0 max-w-full overflow-x-clip">
      <ul className="w-full min-w-0">
        {entries.map((entry, index) => (
          <li key={entry.id} className="w-full min-w-0 last:mb-0">
            <motion.div
              className="sm:hidden"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionView}
              transition={{ duration: 0.32, delay: index * 0.04 }}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-brand-surface-alt bg-brand-primaryAccent ring-1 ring-brand-border/25" />
                </div>
                <time
                  dateTime={entry.date}
                  className="min-w-0 break-words text-sm font-semibold leading-snug text-brand-text"
                >
                  {formatDateLabel(entry.date)}
                </time>
              </div>
              <div className="ml-[13px] border-l-2 border-brand-border/90 pl-3 pt-3 min-[380px]:pl-4">
                <ChangelogEntryCard entry={entry} />
                {index < entries.length - 1 ? <div className="h-5 sm:h-0" /> : null}
              </div>
            </motion.div>

            <motion.div
              className="hidden min-w-0 sm:flex sm:gap-3 md:gap-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionView}
              transition={{ duration: 0.38, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex w-24 shrink-0 flex-col items-end self-start pt-1.5 min-[400px]:w-32 sm:pt-2">
                <time
                  dateTime={entry.date}
                  className="w-full break-words text-right text-[10px] font-semibold leading-tight text-brand-text min-[400px]:text-xs md:text-sm"
                >
                  {formatDateLabel(entry.date)}
                </time>
              </div>

              <div className="flex w-5 shrink-0 flex-col items-center self-stretch md:w-6">
                <div
                  className="relative z-10 mt-1 flex w-5 shrink-0 items-center justify-center md:mt-1.5 md:w-6"
                  aria-hidden
                >
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-brand-surface-alt bg-brand-primaryAccent md:h-3 md:w-3" />
                  <span className="sr-only">Release: {formatDateLabel(entry.date)}</span>
                </div>
                {index < entries.length - 1 ? (
                  <div className="w-px min-h-6 flex-1 bg-brand-border md:min-h-8" aria-hidden />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 pb-6 sm:pb-8 md:pb-10">
                <ChangelogEntryCard entry={entry} />
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
