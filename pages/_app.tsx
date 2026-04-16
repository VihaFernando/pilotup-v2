import App, { AppContext, AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@/styles/globals.css";
import { GsapEffects } from "@/components/GsapEffects";
import { GlobalSEO } from "@/components/GlobalSEO";
import { ThemeProvider } from "@/context/ThemeContext";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";
import { fetchPageBySlug } from "@/lib/strapi";
import { Page } from "@/types";
import { resolveSeoSlug, shouldSkipSeoLookup } from "@/util/seoRoute";

type PilotAppProps = AppProps<{ initialSeoPage?: Page }>;

function PilotApp({ Component, pageProps }: PilotAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <GlobalSEO initialPage={pageProps.initialSeoPage} />
      <GsapEffects />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

PilotApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (typeof window !== "undefined") {
    return appProps;
  }

  const path =
    appContext.ctx.req?.url ||
    appContext.ctx.asPath ||
    appContext.router?.asPath ||
    appContext.ctx.pathname ||
    "/";
  if (shouldSkipSeoLookup(path)) {
    return appProps;
  }

  const slug = resolveSeoSlug(path);
  if (!slug) {
    return appProps;
  }

  try {
    const initialSeoPage = await fetchPageBySlug(slug);
    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        initialSeoPage: initialSeoPage ?? undefined,
      },
    };
  } catch {
    return appProps;
  }
};

export default PilotApp;
