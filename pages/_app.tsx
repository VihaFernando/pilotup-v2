import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { GsapEffects } from "@/components/GsapEffects";
import { GlobalSEO } from "@/components/GlobalSEO";
import { ThemeProvider } from "@/context/ThemeContext";

type PilotAppProps = AppProps;

function PilotApp({ Component, pageProps }: PilotAppProps) {
  return (
    <ThemeProvider>
      <GlobalSEO />
      <GsapEffects />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default PilotApp;
