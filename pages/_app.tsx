import App, { AppContext, AppProps } from "next/app";
import "@/styles/globals.css";
import { GsapEffects } from "@/components/GsapEffects";
import { GlobalSEO } from "@/components/GlobalSEO";
import { ThemeProvider } from "@/context/ThemeContext";
import { fetchPageBySlug } from "@/lib/strapi";
import { Page } from "@/types";
import { resolveSeoSlug, shouldSkipSeoLookup } from "@/util/seoRoute";

type PilotAppProps = AppProps<{ initialSeoPage?: Page }>;

function PilotApp({ Component, pageProps }: PilotAppProps) {
  return (
    <ThemeProvider>
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
