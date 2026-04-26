export type BrandAssetCard = {
  id: string;
  preview: {
    /** Tailwind classes for the preview well */
    bgClass: string;
    image: string;
    alt: string;
    imageClassName?: string;
  };
  /** Add matching files under `public/brand-assets/png/` */
  png: { href: string; downloadAs: string };
  svg: { href: string; downloadAs: string };
};

export const BRAND_ASSET_CARDS: BrandAssetCard[] = [
  {
    id: "full-light",
    preview: {
      bgClass: "bg-white",
      image: "/brand-assets/vectors/Logo-5.svg",
      alt: "PilotUP full logo for light backgrounds",
      imageClassName: "max-h-14 w-auto max-w-[90%] object-contain",
    },
    png: { href: "/brand-assets/png/Logo-5.png", downloadAs: "pilotup-full-logo-light.png" },
    svg: { href: "/brand-assets/vectors/Logo-5.svg", downloadAs: "pilotup-full-logo-light.svg" },
  },
  {
    id: "full-dark",
    preview: {
      bgClass: "bg-[#0a0a0a]",
      image: "/brand-assets/vectors/Logo-6.svg",
      alt: "PilotUP full logo for dark backgrounds",
      imageClassName: "max-h-14 w-auto max-w-[90%] object-contain",
    },
    png: { href: "/brand-assets/png/Logo-6.png", downloadAs: "pilotup-full-logo-dark.png" },
    svg: { href: "/brand-assets/vectors/Logo-6.svg", downloadAs: "pilotup-full-logo-dark.svg" },
  },
  {
    id: "logo",
    preview: {
      bgClass: "bg-white",
      image: "/brand-assets/vectors/Light-Logo-1.svg",
      alt: "PilotUP logo",
      imageClassName: "h-16 w-16 object-contain",
    },
    png: { href: "/brand-assets/png/Light-Logo-1.png", downloadAs: "pilotup-logo.png" },
    svg: { href: "/brand-assets/vectors/Light-Logo-1.svg", downloadAs: "pilotup-logo.svg" },
  },
];
