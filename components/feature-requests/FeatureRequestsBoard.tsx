"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronUp,
  Code2,
  CreditCard,
  FlaskConical,
  Hexagon,
  Inbox,
  LayoutGrid,
  Lightbulb,
  Rocket,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { FeatureRequestType, FeatureRequestView, FeatureReviewStatus } from "@/lib/featureRequests";

const TYPE_ICON: Record<FeatureRequestType, LucideIcon> = {
  product: Rocket,
  api: Code2,
  billing: CreditCard,
  other: LayoutGrid,
};

const TYPE_ICON_BOX: Record<FeatureRequestType, string> = {
  product:
    "border-amber-200/90 bg-amber-50 text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/45 dark:text-amber-200",
  api:
    "border-emerald-200/90 bg-emerald-50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/45 dark:text-emerald-200",
  billing:
    "border-sky-200/90 bg-sky-50 text-sky-900 dark:border-sky-800/50 dark:bg-sky-950/40 dark:text-sky-100",
  other:
    "border-brand-border/80 bg-brand-surface-alt/90 text-brand-text dark:border-white/10 dark:bg-zinc-800/50 dark:text-zinc-200",
};

const STATUS_LABEL: Record<FeatureReviewStatus, string> = {
  idea: "Idea",
  backlog: "Backlog",
  "in-progress": "In progress",
  testing: "Testing",
  "ready-for-development": "Ready for development",
  shipped: "Shipped",
};

const STATUS_ICON: Record<FeatureReviewStatus, LucideIcon> = {
  idea: Lightbulb,
  backlog: Inbox,
  "in-progress": Hexagon,
  testing: FlaskConical,
  "ready-for-development": Wrench,
  shipped: CheckCircle2,
};

/** Pipeline order: earliest stage first, shipped last */
const STATUS_SECTION_ORDER: FeatureReviewStatus[] = [
  "idea",
  "backlog",
  "in-progress",
  "testing",
  "ready-for-development",
  "shipped",
];

type RowProps = {
  row: FeatureRequestView;
  onVoted: (strapiId: string, upvotes: number) => void;
  index: number;
};

function FeatureRequestRow({ row, onVoted, index }: RowProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const TypeIcon = TYPE_ICON[row.type];
  const iconBox = TYPE_ICON_BOX[row.type];

  const upvote = useCallback(async () => {
    if (row.hasUpvoted || loading) {
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/feature-requests/${encodeURIComponent(row.strapiId)}/upvote`, {
        method: "POST",
      });
      const data = (await res.json()) as { ok?: boolean; upvotes?: number; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      if (typeof data.upvotes === "number") {
        onVoted(row.strapiId, data.upvotes);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [loading, onVoted, row.hasUpvoted, row.strapiId]);

  const upvoted = row.hasUpvoted;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
      className="group/row"
    >
      <div
        className={[
          "flex min-w-0 flex-col border-brand-border/70 transition sm:flex-row sm:items-stretch",
          "hover:bg-brand-surface-alt/50 dark:border-white/10 dark:hover:bg-zinc-800/30",
        ].join(" ")}
      >
        <div className="flex min-w-0 flex-1 gap-3 p-3.5 sm:gap-3.5 sm:px-4 sm:py-3.5">
          <div
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border sm:h-10 sm:w-10",
              iconBox,
            ].join(" ")}
            aria-hidden
          >
            <TypeIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-brand-text sm:text-base">{row.title}</h3>
            {row.description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-brand-textMuted">{row.description}</p>
            ) : null}
            <span className="sr-only">Type: {row.type}. Upvotes: {row.upvotes}.</span>
            {error ? <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p> : null}
          </div>
        </div>

        <div
          className={[
            "flex shrink-0 border-t sm:w-[4.5rem] sm:border-l sm:border-t-0",
            upvoted
              ? "border-t-brand-primaryAccent sm:border-l-brand-primaryAccent dark:border-t-brand-primaryAccent dark:sm:border-l-brand-primaryAccent"
              : "border-t border-brand-border/80 sm:border-l sm:border-t-0 sm:border-brand-border/80 dark:border-white/10",
          ].join(" ")}
        >
          <button
            type="button"
            disabled={loading}
            onClick={upvote}
            aria-pressed={upvoted}
            aria-label={
              upvoted
                ? `You have upvoted. ${row.upvotes} upvotes.`
                : `Upvote. Currently ${row.upvotes} upvotes.`
            }
            className={[
              "flex w-full min-h-14 flex-col items-center justify-center gap-0.5 py-2.5 sm:min-h-0 sm:flex-1 sm:py-3",
              "transition",
              upvoted
                ? "pointer-events-none cursor-default bg-brand-primaryAccent text-white"
                : "text-brand-textMuted hover:bg-brand-surface-alt/80 hover:text-brand-text",
              loading && "opacity-50",
            ].join(" ")}
          >
            <ChevronUp
              className={["h-4 w-4", upvoted ? "text-white" : "opacity-80"].join(" ")}
              strokeWidth={2.4}
            />
            <span
              className={[
                "text-sm font-semibold tabular-nums",
                upvoted ? "text-white" : "text-brand-text",
              ].join(" ")}
            >
              {row.upvotes}
            </span>
          </button>
        </div>
      </div>
    </motion.li>
  );
}

type FeatureRequestsBoardProps = {
  initial: FeatureRequestView[];
};

export function FeatureRequestsBoard({ initial }: FeatureRequestsBoardProps) {
  const [rows, setRows] = useState<FeatureRequestView[]>(initial);

  const onVoted = useCallback((strapiId: string, upvotes: number) => {
    setRows((prev) => prev.map((r) => (r.strapiId === strapiId ? { ...r, upvotes, hasUpvoted: true } : r)));
  }, []);

  const byStatus = useMemo(() => {
    const next: Record<FeatureReviewStatus, FeatureRequestView[]> = {
      idea: [],
      backlog: [],
      "in-progress": [],
      testing: [],
      "ready-for-development": [],
      shipped: [],
    };
    for (const r of rows) {
      const k = r.reviewStatus in next ? r.reviewStatus : "idea";
      next[k].push(r);
    }
    for (const status of STATUS_SECTION_ORDER) {
      next[status].sort(
        (a, b) => b.upvotes - a.upvotes || a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
      );
    }
    return next;
  }, [rows]);

  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-10">
      {STATUS_SECTION_ORDER.map((status) => {
        const list = byStatus[status];
        if (list.length === 0) {
          return null;
        }
        const SectionIcon = STATUS_ICON[status];
        return (
          <section key={status} aria-labelledby={`fr-status-${status}`} className="min-w-0">
            <div
              className={[
                "mb-2.5 flex w-full min-w-0 items-center gap-2.5 rounded-xl border border-brand-border/80 bg-white px-3.5 py-2.5 shadow-sm sm:mb-3",
                "dark:border-white/10 dark:bg-zinc-900/50",
              ].join(" ")}
            >
              <SectionIcon className="h-4 w-4 shrink-0 text-brand-textMuted" strokeWidth={1.75} aria-hidden />
              <h2
                id={`fr-status-${status}`}
                className="min-w-0 text-sm font-semibold tracking-tight text-brand-text sm:text-base"
              >
                {STATUS_LABEL[status]}
              </h2>
            </div>

            <div
              className={[
                "overflow-hidden rounded-xl border border-brand-border/80 bg-white shadow-sm",
                "dark:border-white/10 dark:bg-zinc-900/50",
              ].join(" ")}
            >
              <ul className="divide-y divide-brand-border/70 dark:divide-white/10" role="list">
                {list.map((row, i) => (
                  <FeatureRequestRow
                    key={row.strapiId}
                    row={row}
                    onVoted={onVoted}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
