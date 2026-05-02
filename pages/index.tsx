import dynamic from "next/dynamic";
import Image from "next/image";
import type { GetStaticProps } from "next";
import { useEffect } from "react";
import { PlayCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { GlassButton } from "@/components/GlassButton";
import { Footer } from "@/components/Footer";
import { EmployeesSection } from "@/components/EmployeesSection";

const sectionFallback = () => <div className="min-h-[8rem] w-full" aria-hidden />;

const PlatformShowcaseSection = dynamic(
  () => import("@/components/PlatformShowcaseSection").then((m) => m.PlatformShowcaseSection),
  { loading: sectionFallback }
);
const BusinessLearningSections = dynamic(
  () => import("@/components/BusinessLearningSections").then((m) => m.BusinessLearningSections),
  { loading: sectionFallback }
);
const ValuePropsSection = dynamic(() => import("@/components/ValuePropsSection"), { loading: sectionFallback });
const IntegrationsShowcaseSection = dynamic(
  () => import("@/components/IntegrationsShowcaseSection").then((m) => m.IntegrationsShowcaseSection),
  { loading: sectionFallback }
);
const HireFirstSection = dynamic(
  () => import("@/components/HireFirstSection").then((m) => m.HireFirstSection),
  { loading: sectionFallback }
);
const WonderingFaqSection = dynamic(
  () => import("@/components/WonderingFaqSection").then((m) => m.WonderingFaqSection),
  { loading: sectionFallback }
);
const WhyPilotUpSection = dynamic(
  () => import("@/components/WhyPilotUpSection").then((m) => m.WhyPilotUpSection),
  { loading: sectionFallback }
);

const HERO_INTEGRATION_LOGOS: { src: string; width: number; height: number; alt: string }[] = [
  { src: "https://www.svgrepo.com/show/331433/hubspot.svg", width: 64, height: 64, alt: "" },
  {
    src: "https://img.freepik.com/premium-vector/google-meet-icon_1273375-841.jpg?semt=ais_incoming&w=740&q=80",
    width: 64,
    height: 64,
    alt: "",
  },
  {
    src: "https://www.citypng.com/public/uploads/preview/hd-official-whatsapp-wa-whats-app-square-logo-icon-png-image-701751694789353fmmfwzftvc.png?v=2026032718",
    width: 64,
    height: 64,
    alt: "",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/3840px-Slack_icon_2019.svg.png",
    width: 64,
    height: 64,
    alt: "",
  },
];

export default function Home() {
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-brand-surface-alt">
      <div className="mx-auto min-h-screen max-w-[1300px] bg-brand-surface-alt">
        <Navigation />
        <HeroSection />
        <EmployeesSection />
        <PlatformShowcaseSection />
        <BusinessLearningSections />
        <ValuePropsSection />
        <IntegrationsShowcaseSection />
        <HireFirstSection />
        <WonderingFaqSection />
        <WhyPilotUpSection />
      </div>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <div
      data-gsap="hero"
      className="mt-24 bg-brand-surface-alt px-4 pb-10 pt-5 sm:mt-28 sm:px-6 sm:pb-14 sm:pt-6 md:mt-32 md:px-8 md:pb-16 lg:mt-40 lg:px-12 xl:px-16"
    >
      <h1
        className="mx-auto max-w-[24rem] px-1 text-center text-balance text-[clamp(2.15rem,8.3vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-text
          sm:max-w-none sm:px-0 sm:text-[clamp(2.3rem,6.1vw,3.35rem)] sm:leading-[1.08] md:mx-0 md:max-w-none md:text-left md:text-[clamp(2.5rem,4vw,4.25rem)] md:leading-[1.04]
        "
      >
        Close <span className="rounded-md font-bold text-brand-primaryAccent">more deals</span>,
        <span className="block md:hidden">without scaling your headcount.</span>
        <span className="hidden md:block">without scaling headcount.</span>
      </h1>

      <p className="mx-auto mt-4 max-w-[20.75rem] text-center text-[0.87rem] leading-[1.55] text-brand-textMuted sm:max-w-[32rem] sm:text-[0.95rem] sm:leading-relaxed md:mx-0 md:max-w-[42rem] md:text-left md:text-[1.02rem] lg:text-lg">
        PilotUP saves you months of execution by letting you create AI Employees that work together on your business goals and deliver
        human-quality results at a fraction of the cost of hiring.
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
        <div className="flex w-full justify-center sm:w-auto sm:justify-start">
          <GlassButton
            href="/waitlist"
            className="w-[220px] py-2.5 text-[0.95rem] font-semibold sm:w-auto sm:px-4 sm:py-2 sm:text-sm sm:font-medium"
          >
            Get Started. It{"'"}s FREE.
          </GlassButton>
        </div>

        <button
          type="button"
          onClick={() => window.open("https://www.youtube.com/watch?v=QnRtcMGw6d0", "_blank")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-brand-textMuted px-4 py-2 text-sm font-semibold text-brand-textMuted transition"
        >
          <PlayCircle className="h-4 w-4 text-brand-textMuted" />
          <span className="text-brand-textMuted">See How It Works</span>
        </button>
      </div>

      <div className="mt-5 flex w-full items-center justify-center md:justify-start">
        {HERO_INTEGRATION_LOGOS.map((item, index) => (
          <div
            key={item.src}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface-alt object-cover sm:h-9 sm:w-9 ${index > 0 ? "-ml-2" : ""}`}
          >
            <Image
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              className="h-4 w-4 object-contain"
            />
          </div>
        ))}

        <span className="ml-2 text-sm italic text-brand-textMuted">20+ integrations</span>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
