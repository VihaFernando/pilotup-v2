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
  svg?: { href: string; downloadAs: string };
};

export const BRAND_ASSET_CARDS: BrandAssetCard[] = [
  {
    id: "banner",
    preview: {
      bgClass: "bg-[#0b0b0d]",
      image: "/brand-assets/png/banner.png",
      alt: "PilotUP brand banner",
      imageClassName: "max-h-16 w-auto max-w-[90%] object-contain",
    },
    png: { href: "/brand-assets/png/banner.png", downloadAs: "pilotup-banner.png" },
  },
  {
    id: "full-dark",
    preview: {
      bgClass: "bg-[#2b2b2b]",
      image: "/brand-assets/png/full-logo-dark.png",
      alt: "PilotUP full dark logo",
      imageClassName: "max-h-14 w-auto max-w-[90%] object-contain",
    },
    png: { href: "/brand-assets/png/full-logo-dark.png", downloadAs: "pilotup-full-logo-dark.png" },
    svg: { href: "/brand-assets/svg/full-logo-dark.svg", downloadAs: "pilotup-full-logo-dark.svg" },
  },
  {
    id: "full-light",
    preview: {
      bgClass: "bg-[#111217]",
      image: "/brand-assets/svg/full-logo-light.svg",
      alt: "PilotUP full light logo",
      imageClassName: "max-h-14 w-auto max-w-[90%] object-contain",
    },
    png: { href: "/brand-assets/png/full-logo-light.png", downloadAs: "pilotup-full-logo-light.png" },
    svg: { href: "/brand-assets/svg/full-logo-light.svg", downloadAs: "pilotup-full-logo-light.svg" },
  },
  {
    id: "logo-light",
    preview: {
      bgClass: "bg-[#121418]",
      image: "/brand-assets/svg/logo-light.svg",
      alt: "PilotUP light logo mark",
      imageClassName: "h-16 w-16 object-contain",
    },
    png: { href: "/brand-assets/png/logo-light.png", downloadAs: "pilotup-logo-light.png" },
    svg: { href: "/brand-assets/svg/logo-light.svg", downloadAs: "pilotup-logo-light.svg" },
  },
  {
    id: "logo-light-border",
    preview: {
      bgClass: "bg-[#0f1115]",
      image: "/brand-assets/svg/logo-light-border.svg",
      alt: "PilotUP light logo mark with border",
      imageClassName: "h-16 w-16 object-contain",
    },
    png: { href: "/brand-assets/png/logo-light-border.png", downloadAs: "pilotup-logo-light-border.png" },
    svg: { href: "/brand-assets/svg/logo-light-border.svg", downloadAs: "pilotup-logo-light-border.svg" },
  },
  {
    id: "logo-transparent",
    preview: {
      bgClass:
        "bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]",
      image: "/brand-assets/svg/logo-transparent.svg",
      alt: "PilotUP transparent logo mark",
      imageClassName: "h-16 w-16 object-contain",
    },
    png: { href: "/brand-assets/png/logo-transparent.png", downloadAs: "pilotup-logo-transparent.png" },
    svg: { href: "/brand-assets/svg/logo-transparent.svg", downloadAs: "pilotup-logo-transparent.svg" },
  },
];
