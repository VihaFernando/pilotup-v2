import Link from "next/link";
import { FeatureRequestsBoard } from "@/components/feature-requests/FeatureRequestsBoard";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import type { FeatureRequestView } from "@/lib/featureRequests";

type FeatureRequestsPageClientProps = {
  initialRequests: FeatureRequestView[];
};

export function FeatureRequestsPageClient({ initialRequests }: FeatureRequestsPageClientProps) {
  const isEmpty = initialRequests.length === 0;

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt text-brand-text">
      <Navigation />

      <main className="mx-auto w-full min-w-0 max-w-4xl px-3 pb-[max(5rem,env(safe-area-inset-bottom,0px))] pt-24 min-[380px]:px-4 sm:max-w-5xl sm:px-6 sm:pb-20 sm:pt-32 md:px-10">
        <header className="mb-8 sm:mb-12">
          <div className="min-w-0 text-balance">
            <h1 className="text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">
              Feature requests
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-textMuted sm:text-base">
              Discover our plans and suggest new improvements.
            </p>
          </div>
        </header>

        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white/80 px-6 py-14 text-center shadow-sm dark:border-white/10 dark:bg-zinc-900/40">
            <p className="text-base font-medium text-brand-text">No feature requests yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-brand-textMuted">
              When we publish ideas from Strapi, they will show up here for voting.
            </p>
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
    </div>
  );
}
