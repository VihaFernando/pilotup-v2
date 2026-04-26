import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeatureRequestsNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-lg outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[rgb(252,94,86)]/40"
        >
          <img
            src="/Logo-5.png"
            alt="PilotUP"
            className="h-7 w-auto object-contain md:hidden"
            width={120}
            height={28}
          />
          <img
            src="/Logo-primary.png"
            alt="PilotUP"
            className="hidden h-7 w-7 object-contain md:block"
            width={28}
            height={28}
          />
        </Link>

        <Link
          href="/waitlist"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-primaryAccent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Join waitlist
          <ArrowRight className="h-3.5 w-3.5 opacity-90" />
        </Link>
      </div>
    </header>
  );
}
