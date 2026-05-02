import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [loadVideo, setLoadVideo] = useState(false);
  const revealTriggerRef = useRef<HTMLDivElement | null>(null);
  const videoPanelRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const el = videoPanelRef.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-fit border-t border-brand-border bg-brand-surface-alt px-4 py-12 sm:px-6 md:px-8 lg:px-12 lg:pt-20 xl:px-16"
      aria-labelledby="employees-section-heading"
    >
      <div className="mb-8 text-center sm:mb-8 sm:text-left lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-textMuted">Inside PilotUP</p>
        <h2
          id="employees-section-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl lg:text-4xl"
        >
          See Your AI Employees At Work
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-textMuted sm:text-base lg:pb-16">
          Switch between roles to preview real workflows and results from each AI Employee.
        </p>
      </div>

      <div
        ref={revealTriggerRef}
        className="mt-16 flex h-fit w-full border-l-0 border-brand-border sm:mt-20 lg:mt-24 lg:flex lg:overflow-visible lg:border-l-2"
      >
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
                      : "border-dashed border-brand-border bg-transparent text-brand-textMuted hover:border-brand-textMuted/70 hover:text-brand-text",
                  ].join(" ")}
                >
                  {role.title.replace(" Lead", "")}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={[
            "hidden h-fit lg:flex lg:w-[min(100%,300px)] lg:flex-shrink-0 lg:flex-col lg:border-b-0 lg:border-brand-border/80",
            "lg:transform-gpu lg:transition-all lg:duration-700 lg:ease-out",
            desktopReveal ? "scale-100 opacity-100" : "scale-105 opacity-75",
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
          ref={videoPanelRef}
          role="tabpanel"
          aria-labelledby={`tab-${selected}`}
          className={[
            "relative z-10 mt-2 flex h-full min-h-[340px] flex-1 items-end justify-center overflow-hidden py-4 sm:py-6 lg:ml-8 lg:mt-0 lg:overflow-visible xl:ml-12",
            "lg:transform-gpu lg:transition-all lg:duration-700 lg:delay-100 lg:ease-out",
            desktopReveal ? "scale-100 opacity-100" : "scale-105 opacity-75",
          ].join(" ")}
          style={{
            backgroundImage: "radial-gradient(rgb(var(--color-border) / 0.35) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="relative z-10 flex w-full translate-y-6 items-center justify-center px-2 sm:translate-y-8 sm:px-4 md:translate-y-12 lg:px-0">
            <AnimatePresence mode="wait">
              {selectedRole && (
                <motion.div
                  key={selectedRole.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative h-[280px] w-full max-w-[320px] sm:h-[360px] sm:max-w-[420px] md:h-[380px] md:max-w-[480px]"
                >
                  {loadVideo ? (
                    <video
                      key={selectedRole.video}
                      src={selectedRole.video}
                      poster={selectedRole.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={selectedRole.poster}
                        alt=""
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 100vw, 480px"
                      />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 z-[1] h-full w-full -translate-y-24 sm:-translate-y-24 sm:scale-[1.35] md:-translate-y-36 md:scale-[1.55]">
                    <Image
                      src={selectedRole.image}
                      alt=""
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 -bottom-7 z-20 h-36 sm:-bottom-9 sm:h-44 md:-bottom-10 md:h-52"
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
