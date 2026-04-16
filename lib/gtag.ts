export const GA_MEASUREMENT_ID = "G-0K3CRYDW2F";

type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageview(path: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}

export function event(name: string, params: GtagParams = {}): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}
