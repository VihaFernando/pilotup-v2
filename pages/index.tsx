import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { GlassButton } from "@/components/GlassButton";
import { PlatformShowcaseSection } from "@/components/PlatformShowcaseSection";
import { BusinessLearningSections } from "@/components/BusinessLearningSections";
import ValuePropsSection from "@/components/ValuePropsSection";
import { IntegrationsShowcaseSection } from "@/components/IntegrationsShowcaseSection";
import { HireFirstSection } from "@/components/HireFirstSection";
import { WonderingFaqSection } from "@/components/WonderingFaqSection";
import { Footer } from "@/components/Footer";
import { PlayCircle, Users, Briefcase, Brain, Workflow, BarChart3, Zap } from "lucide-react";

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
      <div className="min-h-screen max-w-[1300px] mx-auto bg-brand-surface-alt">
        <Navigation />
        <HeroSection />
        <EmployeesSection />
        <PlatformShowcaseSection />
        <BusinessLearningSections />
        <ValuePropsSection />
        <IntegrationsShowcaseSection />
        <HireFirstSection />
        <WonderingFaqSection />
        <WhyPilotUP />
      </div>
      <Footer />
    </div>
  );
}

export function HeroSection() {
  return (
    <div data-gsap="hero" className="bg-brand-surface-alt mt-24 px-4 pb-10 pt-5 sm:mt-28 sm:px-6 sm:pb-14 sm:pt-6 md:mt-32 md:px-8 md:pb-16 lg:mt-40 lg:px-12 xl:px-16">
      <h1
        className="font-semibold text-brand-text text-balance
          text-[clamp(2.15rem,8.3vw,2.85rem)] sm:text-[clamp(2.3rem,6.1vw,3.35rem)] md:text-[clamp(2.5rem,4vw,4.25rem)]
          leading-[1.1] sm:leading-[1.08] md:leading-[1.04]
          tracking-[-0.02em] text-center md:text-left mx-auto max-w-[24rem] px-1 sm:max-w-none sm:px-0 md:mx-0
        "
      >
        Close {" "}
        <span className="text-brand-primaryAccent rounded-md font-bold">
          more deals
        </span>,
        <span className="block md:hidden">without scaling your headcount.</span>
        <span className="hidden md:block">without scaling headcount.</span>
      </h1>


      <p className="mx-auto mt-4 max-w-[20.75rem] text-brand-textMuted text-[0.87rem] leading-[1.55] text-center sm:max-w-[32rem] sm:text-[0.95rem] sm:leading-relaxed md:mx-0 md:max-w-[42rem] md:text-left md:text-[1.02rem] lg:text-lg">
        PilotUP saves you months of execution by letting you create AI Employees that work together on your business goals and deliver
        human-quality results at a fraction of the cost of hiring.
      </p>

      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center md:justify-start">
        <div className="flex w-full justify-center sm:w-auto sm:justify-start">
          <GlassButton href="/waitlist" className="w-[220px] py-2.5 text-[0.95rem] font-semibold sm:w-auto sm:px-4 sm:py-2 sm:text-sm sm:font-medium">
            Get Started. It{"'"}s FREE.
          </GlassButton>
        </div>

        <button
          type="button"
          onClick={() => window.open("https://www.youtube.com/watch?v=QnRtcMGw6d0", "_blank")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-textMuted border-dashed px-4 py-2 text-sm font-semibold text-brand-textMuted transition"
        >
          <PlayCircle className="h-4 w-4 text-brand-textMuted" />
          <span className="text-brand-textMuted">See How It Works</span>
        </button>
      </div>

      <div className="mt-5 flex w-full items-center justify-center md:justify-start">
        {[
          "https://www.svgrepo.com/show/331433/hubspot.svg",
          "https://img.freepik.com/premium-vector/google-meet-icon_1273375-841.jpg?semt=ais_incoming&w=740&q=80",
          "https://www.citypng.com/public/uploads/preview/hd-official-whatsapp-wa-whats-app-square-logo-icon-png-image-701751694789353fmmfwzftvc.png?v=2026032718",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/3840px-Slack_icon_2019.svg.png"
        ].map((item, index) => (
          <div key={item} className={`w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full flex items-center justify-center bg-brand-surface-alt border border-brand-border ${index > 0 ? "-ml-2" : ""}`} >
            <img src={item} className="w-4 h-4" />
          </div>
        ))}

        <span className="ml-2 text-sm italic text-brand-textMuted">20+ integrations</span>
      </div>


    </div>
  );
}

const EMPLOYEE_ROLES = [
  {
    id: "Sales" as const,
    title: "Sales Lead",
    description: "Pipeline, outreach, and deal velocity without extra hires.",
    video: "/sales.mp4",
    poster: "/sales-guy.png",
    image: "/sales-tasks.png",
  },
  {
    id: "Growth" as const,
    title: "Growth & Content Lead",
    description: "Experiments, lifecycle, and expansion loops on repeat.",
    video: "/marketing.mp4",
    poster: "/growth-girl.png",
    image: "/growth.png",
  },
  {
    id: "Support" as const,
    title: "Support Lead",
    description: "Tickets, answers, and customer success at scale.",
    video: "/support.mp4",
    poster: "/support-girl.png",
    image: "/support.png",
  },
  {
    id: "Ops" as const,
    title: "Operations Manager",
    description: "Back-office workflows, data, and internal coordination.",
    video: "/ops.mp4",
    poster: "/ops-guy.png",
    image: "/Ops.png",
  },
];

export type EmployeeRoleId = (typeof EMPLOYEE_ROLES)[number]["id"];

export function EmployeesSection() {
  const [selected, setSelected] = useState<EmployeeRoleId>("Sales");
  const [desktopReveal, setDesktopReveal] = useState(false);
  const revealTriggerRef = useRef<HTMLDivElement | null>(null);
  const selectedRole = EMPLOYEE_ROLES.find((role) => role.id === selected);

  useEffect(() => {
    const target = revealTriggerRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDesktopReveal(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="border-t border-brand-border bg-brand-surface-alt px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:pt-20 h-fit"
      aria-labelledby="employees-section-heading"
    >
      <div className="mb-8 text-center sm:text-left sm:mb-8 lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-textMuted">Inside PilotUP</p>
        <h2 id="employees-section-heading" className="mt-2 text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl lg:text-4xl">
          See Your AI Employees At Work
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-textMuted sm:text-base lg:pb-12">
          Switch between roles to preview real workflows and results from each AI Employee.
        </p>
      </div>

      <div ref={revealTriggerRef} className="mt-16 sm:mt-20 lg:mt-24 w-full border-l-0 border-brand-border lg:border-l-2 lg:flex lg:overflow-visible h-fit">
        <div
          className="relative z-30 px-4 pb-4 pt-2 sm:px-5 lg:hidden"
          role="tablist"
          aria-label="Employee types mobile"
        >
          <div className="mx-auto flex max-w-[420px] flex-wrap justify-center gap-2">
            {EMPLOYEE_ROLES.map((role) => {
              const isActive = selected === role.id;
              return (
                <button
                  key={`mobile-${role.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="employees-workspace-panel"
                  tabIndex={0}
                  onClick={() => setSelected(role.id)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold leading-none transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primaryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface-alt",
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-brand-border border-dashed bg-transparent text-brand-textMuted hover:border-brand-textMuted/70 hover:text-brand-text",
                  ].join(" ")}
                >
                  {role.title.replace(" Lead", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* —— Left: role list —— */}
        <div
          className={[
            "hidden lg:flex lg:flex-col lg:w-[min(100%,300px)] lg:flex-shrink-0 lg:border-b-0 lg:border-brand-border/80 h-fit",
            "lg:transform-gpu lg:transition-all lg:duration-700 lg:ease-out",
            desktopReveal ? "lg:opacity-100 lg:translate-y-0" : "lg:opacity-40",
          ].join(" ")}
          role="tablist"
          aria-label="Employee types"
        >
          {EMPLOYEE_ROLES.map((role) => {
            const isActive = selected === role.id;
            return (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                id={`tab-${role.id}`}
                aria-controls="employees-workspace-panel"
                tabIndex={0}
                onClick={() => setSelected(role.id)}
                className={[
                  "relative w-full border-l-[3px] px-4 py-4 text-left transition-colors sm:px-5 sm:py-5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primaryAccent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface-alt",
                  isActive
                    ? "border-brand-primaryAccent bg-gradient-to-r from-brand-surface to-transparent"
                    : "border-transparent hover:bg-brand-border/15",
                ].join(" ")}
              >
                <span
                  className={
                    isActive
                      ? "text-base font-semibold text-brand-text sm:text-lg"
                      : "text-base font-semibold text-brand-textMuted sm:text-lg"
                  }
                >
                  {role.title}
                </span>
                <span
                  className={
                    isActive
                      ? "mt-1 block text-sm leading-snug text-brand-textMuted"
                      : "mt-1 block text-sm leading-snug text-brand-textMuted/70"
                  }
                >
                  {role.description}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="employees-workspace-panel"
          role="tabpanel"
          aria-labelledby={`tab-${selected}`}
          className={[
            "relative z-10 mt-2 h-full flex-1 flex items-end justify-center overflow-hidden py-4 sm:py-6 lg:ml-8 lg:mt-0 lg:overflow-visible xl:ml-12",
            "lg:transform-gpu lg:transition-all lg:duration-700 lg:delay-100 lg:ease-out",
            desktopReveal ? "lg:opacity-100 lg:translate-y-0" : "lg:translate-y-10 lg:opacity-40",
          ].join(" ")}
          style={{
            backgroundImage: "radial-gradient(rgb(var(--color-border) / 0.35) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            minHeight: "340px",
          }}
        >

          <div className="relative z-10 flex items-center justify-center w-full px-2 sm:px-4 lg:px-0 translate-y-6 sm:translate-y-8 md:translate-y-12">
            <AnimatePresence mode="wait">
              {selectedRole && (
                <motion.div
                  key={selectedRole.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative h-[280px] sm:h-[360px] md:h-[380px] w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px]"
                >
                  <video
                    src={selectedRole.video}
                    poster={selectedRole.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-contain object-center pointer-events-none"
                  />

                  <img
                    src={selectedRole.image}
                    className="absolute inset-0 h-full w-full scale-110 sm:scale-135 md:scale-[1.55] -translate-y-24 sm:-translate-y-24 md:-translate-y-36 object-contain object-center pointer-events-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="absolute inset-x-0 -bottom-7 sm:-bottom-9 md:-bottom-10 h-36 sm:h-44 md:h-52 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 52%, rgba(255,255,255,0.98) 76%, rgb(var(--color-surface-alt)) 100%)",
              filter: "blur(1px)",
            }}
          />

        </div>
      </div>
    </div>
  );
}

const ROTATING_WORDS = ["Sales", "Marketing", "Support", "Research", "Operations", "Development"];

const VALUE_PROPS_DEEP = [
  {
    icon: Users,
    title: "Build an entire team of AI Employees",
    desc: "Build AI Employees that can handle any use case, across any industry",
  },
  {
    icon: Briefcase,
    title: "Built for all business tasks",
    desc: "Your AI Employees does everything from A - Z to ensure your business runs towards success.",
  },
  {
    icon: Brain,
    title: "Human-quality output",
    desc: "Your AI Employee matches your tone of voice, and improves with every task.",
  },
  {
    icon: Workflow,
    title: "Collaborates with the team",
    desc: "Your AI Employees work together on certain tasks collaboratively.",
  },
  {
    icon: BarChart3,
    title: "Built for any Business",
    desc: "AI Employees can handle any workflows from a new startup to an enterprise level.",
  },
  {
    icon: Zap,
    title: "Results from day one",
    desc: "Your AI Employee starts delivering on its first assignment, and keeps going 24/7 without breaks.",
  },
];

export function WhyPilotUP() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-14 pb-24 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-brand-surface-alt overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-5"
          >
            Scale your{" "}
            <span className="relative inline-flex overflow-hidden align-baseline h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIdx]}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block text-brand-primaryAccent"
                >
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xl text-brand-textMuted font-medium max-w-2xl mx-auto leading-relaxed"
          >
            and watch your business grow towards success
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
          {VALUE_PROPS_DEEP.map((prop, i) => {
            const IconComp = prop.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.08 * i, duration: 0.45 }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center mb-4">
                  <IconComp className="w-5 h-5 text-brand-textMuted" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">{prop.title}</h3>
                <p className="text-sm text-brand-textMuted leading-relaxed">{prop.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/waitlist"
            className="px-7 py-3.5 rounded-xl bg-brand-primaryAccent text-white font-semibold text-sm hover:bg-brand-primaryAccent/90 transition shadow-sm"
          >
            Get Started - It&apos;s Free
          </Link>

          <button
            type="button"
            onClick={() => window.open("https://www.youtube.com/watch?v=QnRtcMGw6d0", "_blank")}
            className="px-7 py-3.5 rounded-xl bg-transparent border border-brand-border text-brand-text font-semibold text-sm hover:bg-brand-border/15 transition"
          >
            See how it works
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
