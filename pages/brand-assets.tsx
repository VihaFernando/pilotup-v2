import type { GetStaticProps } from "next";
import Head from "next/head";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BrandAssetCard } from "@/components/BrandAssetCard";
import { BRAND_ASSET_CARDS, type BrandAssetCard as CardType } from "@/lib/brandAssets";

type Props = {
  cards: CardType[];
};

export default function BrandAssetsPage({ cards }: Props) {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-brand-surface-alt">
      <Head>
        <title>Brand assets | PilotUP</title>
        <meta
          name="description"
          content="Download PilotUP logos in PNG and SVG for press, partners, and light or dark UIs. Official marks only; do not alter or distort."
        />
        <link rel="canonical" href="/brand-assets" />
      </Head>

      <Navigation />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 md:px-8">
        <header className="mb-10 text-balance sm:mb-12">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">Brand assets</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-textMuted">
            Download official PilotUP logos in PNG and SVG. Use them when you cover us or list PilotUP as a partner—do
            not change proportions, colors, or add effects.
          </p>
        </header>

        <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.id} className="flex h-full min-w-0">
              <BrandAssetCard card={card} />
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { cards: BRAND_ASSET_CARDS },
});
