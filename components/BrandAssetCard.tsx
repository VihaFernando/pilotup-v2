import type { BrandAssetCard as BrandAssetCardType } from "@/lib/brandAssets";

const PREVIEW_H = "h-[200px] sm:h-[220px]";

export function BrandAssetCard({ card }: { card: BrandAssetCardType }) {
  return (
    <article className={`flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border/90`} >
      <div
        className={[
          card.preview.bgClass,
          "flex shrink-0 items-center justify-center px-20 py-8 z-10",
          PREVIEW_H,
        ].join(" ")}
      >
        <img
          src={card.preview.image}
          alt={card.preview.alt}
          className={"h-full w-auto max-h-[80%] object-contain"}
          loading="lazy"
        />
      </div>
      <div className="mt-auto flex min-h-0 flex-col border-t border-brand-border/80 bg-white">
        <div className="divide-y divide-brand-border/60">
          <DownloadRow label="PNG" href={card.png.href} downloadAs={card.png.downloadAs} />
          {card.svg ? <DownloadRow label="SVG" href={card.svg.href} downloadAs={card.svg.downloadAs} /> : null}
        </div>
      </div>
    </article>
  );
}

function DownloadRow({ label, href, downloadAs }: { label: string; href: string; downloadAs: string }) {
  return (
    <div className="flex h-12 items-center justify-between gap-3 px-4 sm:h-[3.25rem]">
      <span className="text-xs font-semibold text-brand-text">{label}</span>
      <a
        href={href}
        download={downloadAs}
        className="shrink-0 text-xs font-medium text-brand-textMuted transition hover:text-brand-primaryAccent hover:underline sm:text-sm"
      >
        Download
      </a>
    </div>
  );
}
