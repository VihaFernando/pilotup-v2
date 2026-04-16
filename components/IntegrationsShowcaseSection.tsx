import Link from "next/link";

const INTEGRATION_LOGOS = [
    { name: "Slack", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Gmail", src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "GitHub", src: "https://img.icons8.com/?size=100&id=12599&format=png&color=000000" },
    { name: "ClickUp", src: "https://img.icons8.com/?size=100&id=znqq179L1K9g&format=png&color=000000" },
    { name: "Google Meet", src: "https://img.icons8.com/?size=100&id=pE97I4t7Il9M&format=png&color=000000" },
    { name: "VS Code", src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
    { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

type LogoItem = (typeof INTEGRATION_LOGOS)[number];

function IntegrationsRow({ logos, duration, reverse = false }: { logos: LogoItem[]; duration: number; reverse?: boolean }) {
    const row = [...logos, ...logos];

    return (
        <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-brand-surface-alt via-brand-surface-alt/96 to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-brand-surface-alt via-brand-surface-alt/96 to-transparent sm:w-28" />
            <div
                className={`relative z-0 flex w-[200%] items-center gap-2 sm:gap-3 ${reverse ? "animate-infinite-marquee-reverse" : "animate-infinite-marquee"}`}
                style={{
                    animationDuration: `${duration}s`,
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
                    maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
                }}
            >
                {row.map((logo, index) => (
                    <div
                        key={`${logo.name}-${index}`}
                        className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200/55 bg-white/55 shadow-[0_10px_26px_-24px_rgba(15,23,42,0.35)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 hover:border-slate-300/70 hover:bg-white/70 sm:h-14 sm:w-14"
                        aria-label={logo.name}
                        title={logo.name}
                    >
                        <img src={logo.src} alt={logo.name} className="h-6 w-6 object-contain sm:h-7 sm:w-7" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function IntegrationsShowcaseSection() {
    const firstLine = [...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS];
    const secondLine = [...INTEGRATION_LOGOS.slice(3), ...INTEGRATION_LOGOS.slice(0, 3), ...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS.slice(0, 4)];

    return (
        <section data-gsap="fade-up" className="relative overflow-hidden bg-brand-surface-alt px-4 pt-14 pb-8 sm:px-6 sm:pt-16 sm:pb-10 md:px-8 md:pt-20 md:pb-12 lg:px-12 xl:px-16">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(70% 60% at 50% 40%, rgb(var(--color-accent-blue) / 0.12), transparent 72%), radial-gradient(60% 55% at 50% 72%, rgb(var(--color-border) / 0.2), transparent 76%), linear-gradient(180deg, rgb(var(--color-surface-alt)) 0%, rgb(var(--color-surface-alt)) 100%)",
                }}
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-brand-surface-alt via-brand-surface-alt/92 to-transparent sm:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-brand-surface-alt via-brand-surface-alt/92 to-transparent sm:w-20" />

            <div className="relative mx-auto w-full max-w-[1120px]">
                <div data-gsap="fade-up" className="mx-auto max-w-3xl px-3 text-center sm:px-0">
                    <h2 className="text-balance whitespace-nowrap text-[1.45rem] font-semibold tracking-tight text-brand-text sm:whitespace-normal sm:text-4xl md:text-5xl">
                        Connect all your favorite tools to your workplace
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-textMuted sm:text-base">
                        Use pre-built nodes for common apps. Custom API connections for everything else.
                    </p>
                </div>

                <div data-gsap="fade-up" className="relative mt-8 space-y-3 sm:mt-10 sm:space-y-4">
                    <IntegrationsRow logos={firstLine} duration={120} />
                    <IntegrationsRow logos={secondLine} duration={140} reverse />
                </div>

                <div data-gsap="fade-up" className="mt-8 flex justify-center sm:mt-10">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg bg-brand-primaryAccent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_-12px_rgba(249,115,22,0.8)] transition hover:brightness-105"
                    >
                        Browse all integrations
                    </Link>
                </div>
            </div>
        </section>
    );
}
