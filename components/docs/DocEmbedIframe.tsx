"use client";

import { useEffect, useState } from "react";

const SHELL =
  "relative w-full max-w-full overflow-hidden rounded-lg border border-slate-200/80 dark:border-[#4a4a4a] bg-slate-100/30 dark:bg-black/20 aspect-video max-h-[min(70vh,540px)] w-[min(100%,calc(16/9*min(70vh,540px)))] mx-auto";

type DocEmbedIframeProps = {
  src: string;
  title: string;
  allow?: string;
};

/**
 * Embeds (YouTube, etc.) are mounted only after the client has hydrated. Server + first client
 * pass render the same placeholder box, avoiding iframe-specific hydration mismatches in React/Next.
 */
export function DocEmbedIframe({ src, title, allow }: DocEmbedIframeProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="my-6 flex w-full max-w-full justify-center">
      <div className={SHELL} aria-busy={!ready || undefined}>
        {!ready ? (
          <div
            className="absolute left-0 top-0 h-full w-full border-0 bg-slate-200/50 dark:bg-zinc-800/60"
            aria-hidden
          />
        ) : (
          <iframe
            className="absolute left-0 top-0 h-full w-full border-0"
            src={src}
            title={title}
            allow={allow}
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </div>
  );
}
