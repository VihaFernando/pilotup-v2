type CommsChip = {
    id: string;
    kind: "gmail" | "whatsapp" | "teams" | "webex" | "slack" | "meet" | "chat" | "discord" | "blank";
};

const COMMS_ICON_SRC: Record<Exclude<CommsChip["kind"], "blank">, string> = {
    gmail: "https://api.iconify.design/logos:google-gmail.svg",
    whatsapp: "https://api.iconify.design/logos:whatsapp-icon.svg",
    teams: "https://api.iconify.design/logos:microsoft-teams.svg",
    webex: "https://cdn.simpleicons.org/webex/00A0DF",
    slack: "https://api.iconify.design/logos:slack-icon.svg",
    meet: "https://api.iconify.design/logos:google-meet.svg",
    chat: "https://cdn.simpleicons.org/googlechat/34A853",
    discord: "https://api.iconify.design/logos:discord-icon.svg",
};

const COMMS_ROWS: CommsChip[][] = [
    [
        { id: "gmail-a", kind: "gmail" },
        { id: "blank-a", kind: "blank" },
        { id: "wa-a", kind: "whatsapp" },
        { id: "blank-b", kind: "blank" },
        { id: "teams-a", kind: "teams" },
    ],
    [
        { id: "blank-c", kind: "blank" },
        { id: "teams-b", kind: "teams" },
        { id: "webex-a", kind: "webex" },
        { id: "blank-d", kind: "blank" },
        { id: "slack-a", kind: "slack" },
    ],
    [
        { id: "meet-a", kind: "meet" },
        { id: "wa-b", kind: "whatsapp" },
        { id: "blank-e", kind: "blank" },
        { id: "chat-a", kind: "chat" },
        { id: "blank-f", kind: "blank" },
        { id: "discord-a", kind: "discord" },
    ],
    [
        { id: "slack-b", kind: "slack" },
        { id: "blank-g", kind: "blank" },
        { id: "gmail-b", kind: "gmail" },
        { id: "blank-h", kind: "blank" },
        { id: "webex-b", kind: "webex" },
    ],
];

function CommsRow({ chips, className }: { chips: CommsChip[]; className?: string }) {
    return (
        <div
            className={[
                "flex items-center gap-2.5 rounded-xl border border-[#d28d19] bg-[#f8cb81] px-5 py-2.5 shadow-[0_9px_18px_rgba(101,54,0,0.24)] sm:px-6",
                className ?? "",
            ].join(" ")}
        >
            {chips.map((chip) => (
                <div
                    key={chip.id}
                    className={[
                        "grid h-9 w-9 place-items-center rounded-md text-[15px] font-extrabold sm:h-10 sm:w-10",
                        chip.kind === "blank" ? "border border-[#dbad64] bg-[#f4dbab]" : "border-transparent bg-transparent",
                    ].join(" ")}
                >
                    {chip.kind === "blank" ? (
                        <span className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <img
                            src={COMMS_ICON_SRC[chip.kind]}
                            alt={`${chip.kind} logo`}
                            className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                            loading="lazy"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export function PlatformShowcaseSection() {
    return (
        <section data-gsap="fade-up" className="px-4 py-14 sm:px-6 sm:py-20 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto w-full max-w-[1180px]">
                <div data-gsap="fade-up" className="mx-auto max-w-4xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-primaryAccent/80 sm:text-sm">
                        Why It Is Different
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                        PilotUP is not "JUST ANOTHER AI TOOL"
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                        It is a platform that helps you create AI employees that work 24/7 and handle different tasks.
                        Think of it as a full-on team where no one sleeps.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:gap-6">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <article data-gsap="fade-up" className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#7ba5c8] via-[#67a0d1] to-[#2e89d5] px-6 pb-0 pt-8 text-white shadow-[0_20px_40px_-24px_rgba(0,67,120,0.65)] sm:px-8 sm:pt-10 md:min-h-[700px]">
                            <div className="relative z-20 max-w-[420px] pb-72 sm:pb-80 md:pb-[25rem]">
                                <h3 className="text-[2.05rem] font-semibold leading-[1.16] tracking-[-0.01em] sm:text-[2.6rem]">
                                    A Team That
                                    <br />
                                    Works For You
                                </h3>
                                <p className="mt-6 max-w-[380px] text-[1.03rem] leading-[1.42] text-white/95 sm:text-[1.14rem]">
                                    More than individual agents, your AI employees collaborate, share context, and move
                                    work forward together, like a team that never slows down.
                                </p>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(255,255,255,0.22),transparent_45%)]" />

                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
                                <img
                                    src="card-1.png"
                                    alt="Team collaborating around a table"
                                    className="h-auto w-full scale-[1.08] object-cover object-bottom sm:scale-[1.1]"
                                    loading="lazy"
                                />
                            </div>
                        </article>

                        <article data-gsap="fade-up" className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#f8be00] via-[#f2ab00] to-[#e79000] px-6 pb-6 pt-8 text-white shadow-[0_20px_40px_-24px_rgba(105,58,0,0.6)] sm:px-8 sm:pt-10 md:min-h-[535px]">
                            <div className="relative z-20 max-w-[420px]">
                                <h3 className="text-[2.05rem] font-semibold leading-[1.16] tracking-[-0.01em] sm:text-[2.6rem]">
                                    Real-Time
                                    <br />
                                    Communication
                                </h3>
                                <p className="mt-6 max-w-[390px] text-[1.03rem] leading-[1.42] text-white/95 sm:text-[1.14rem]">
                                    Your AI employees communicate like real team members, responding on WhatsApp,
                                    handling emails, joining meetings, and staying in sync with your world in real time.
                                </p>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(255,255,255,0.16),transparent_42%)]" />

                            <div className="relative z-20 mt-8 ml-[-0.5rem] flex w-[calc(100%+1rem)] flex-col gap-2.5 sm:mt-12 sm:ml-[-0.75rem] sm:w-[calc(100%+1.5rem)] sm:gap-3 md:absolute md:bottom-6 md:left-1/2 md:ml-0 md:mt-0 md:w-[calc(100%+2rem)] md:gap-5 md:-translate-x-1/2 lg:gap-6">
                                <CommsRow chips={COMMS_ROWS[0]} className="w-[72%] self-end justify-between" />
                                <CommsRow chips={COMMS_ROWS[1]} className="w-[76%] self-start justify-between" />
                                <CommsRow chips={COMMS_ROWS[2]} className="w-[85%] self-end justify-between" />
                                <CommsRow chips={COMMS_ROWS[3]} className="w-[84%] self-start justify-between" />
                            </div>
                        </article>
                    </div>

                    <article data-gsap="fade-up" className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#ef4343] via-[#e4121f] to-[#c50012] px-6 pb-6 pt-8 text-white shadow-[0_20px_45px_-24px_rgba(123,2,13,0.7)] sm:px-8 sm:pb-8 sm:pt-10 md:min-h-[520px] md:px-10 md:pt-12">
                        <div className="relative z-20 max-w-[760px] pb-64 sm:pb-72 md:pb-44 lg:pb-48">
                            <h3 className="text-[2rem] font-semibold leading-[1.14] tracking-[-0.01em] sm:text-[2.6rem]">
                                Build Employees In Any Field
                            </h3>
                            <p className="mt-5 max-w-[760px] text-[1.02rem] font-semibold leading-[1.5] text-white/95 sm:text-[1.14rem]">
                                Create AI employees across any part of your business, each tailored to take ownership,
                                adapt, and grow within their role.
                            </p>
                        </div>

                        <div className="pointer-events-none absolute -bottom-1 right-0 z-10 w-[83%] max-w-none sm:-bottom-2 sm:w-[74%] md:-bottom-4 md:w-[49%] lg:-bottom-6">
                            <img
                                src="card-3.png"
                                alt="AI employees representing different business roles"
                                className="h-auto w-full scale-[1.06] object-cover object-bottom sm:scale-[1.08]"
                                loading="lazy"
                            />
                        </div>

                        <div className="absolute bottom-5 left-6 z-20 sm:left-8 md:left-10">
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/0">
                                <img
                                    src="/logo-white.png"
                                    alt="Logo"
                                    className="h-10 w-10 object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(255,255,255,0.15),transparent_42%)]" />
                    </article>
                </div>
            </div>
        </section>
    );
}
