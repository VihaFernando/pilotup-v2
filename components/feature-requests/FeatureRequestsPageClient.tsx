"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { FeatureRequestsBoard } from "@/components/feature-requests/FeatureRequestsBoard";
import { NewRequestModal } from "@/components/feature-requests/NewRequestModal";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import type { FeatureRequestView, RequestPriority } from "@/lib/featureRequests";
import { persistLastSubmittedNotionPageId } from "@/lib/featureRequestClientStorage";

type FeatureRequestsPageClientProps = {
  initialRequests: FeatureRequestView[];
};

export function FeatureRequestsPageClient({ initialRequests }: FeatureRequestsPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitBanner, setSubmitBanner] = useState<boolean>(false);

  const isEmpty = initialRequests.length === 0;

  const handleSubmitRequest = useCallback(async ({ text, priority }: { text: string; priority: RequestPriority }) => {
    const trimmed = text.trim();
    const summary =
      priority === "medium"
        ? trimmed
        : `${trimmed}\n\n(Priority selected in PilotUP: ${priority})`;

    const res = await fetch("/api/feature-requests/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ summary }),
    });

    const data = (await res.json()) as {
      ok?: boolean;
      error?: string;
      notionPageId?: string;
    };

    if (!res.ok || data.ok !== true || !data.notionPageId) {
      throw new Error(data.error?.trim() || "Could not submit your request");
    }

    persistLastSubmittedNotionPageId(data.notionPageId);
    setSubmitBanner(true);
  }, []);

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt text-brand-text">
      <Navigation />

      <main className="mx-auto w-full min-w-0 max-w-4xl px-3 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-24 min-[380px]:px-4 sm:max-w-5xl sm:px-6 sm:pb-20 sm:pt-32 md:px-10">
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 text-balance">
              <h1 className="text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">
                Feature requests
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-textMuted sm:text-base">
                Discover our plans and suggest new improvements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-primaryAccent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              Submit a request
            </button>
          </div>

          {submitBanner ? (
            <div
              className="mt-6 rounded-xl border border-emerald-200/90 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/35 dark:text-emerald-100"
              role="status"
            >
              <span className="font-medium">Request received. Thank you for sharing this with us.</span>{" "}
              Our admin team will review it shortly.
              <button
                type="button"
                onClick={() => setSubmitBanner(false)}
                className="ml-3 text-emerald-800/90 underline-offset-2 hover:underline dark:text-emerald-200/90"
              >
                Dismiss
              </button>
            </div>
          ) : null}
        </header>

        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white/80 px-6 py-14 text-center shadow-sm dark:border-white/10 dark:bg-zinc-900/40">
            <p className="text-base font-medium text-brand-text">No published requests yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-brand-textMuted">
              When we sync ideas from our backlog, they will appear here. You can still submit a new request anytime.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-primaryAccent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Submit a request
            </button>
            <p className="mt-8 text-xs text-brand-textMuted">
              <Link href="/" className="underline-offset-4 transition hover:text-brand-text hover:underline">
                Back to PilotUP home
              </Link>
            </p>
          </div>
        ) : (
          <FeatureRequestsBoard initial={initialRequests} />
        )}
      </main>

      <Footer />

      <NewRequestModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmitRequest} />
    </div>
  );
}
