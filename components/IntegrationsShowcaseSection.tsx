import Link from "next/link";

const INTEGRATION_LOGOS = [
    { name: "WhatsApp", src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { name: "ClickUP", src: "https://e7.pngegg.com/pngimages/221/620/png-clipart-clickup-logo-thumbnail-tech-companies-thumbnail.png" },
    { name: "Jira", src: "https://cdn.worldvectorlogo.com/logos/jira-3.svg" },
    { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Gmail", src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "google meet", src: "https://cdn.worldvectorlogo.com/logos/google-meet-icon-2020-.svg" },
    { name: "vs code", src: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" },
    { name: "slack", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "discord", src: "https://cdn.worldvectorlogo.com/logos/discord-6.svg" },
    { name: "telegram", src: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" },
    { name: "figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
    { name: "hubspot", src: "https://cdn.worldvectorlogo.com/logos/hubspot-1.svg" },
    { name: "buffer", src: "https://cdn-icons-png.flaticon.com/512/4817/4817546.png" },
    { name: "loops", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLPZ1y49oF28nkE3hqb2Fy1z-vZG48tlTUg&s" },
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
    const duplicated = [...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS];
    const firstLine = duplicated.filter((_, index) => index % 2 === 0);
    const secondLine = duplicated.filter((_, index) => index % 2 === 1);

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
                    {/* <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg bg-brand-primaryAccent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_-12px_rgba(249,115,22,0.8)] transition hover:brightness-105"
                    >
                        Browse all integrations
                    </Link> */}
                </div>
            </div>
        </section>
    );
}
