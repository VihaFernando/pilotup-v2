export function BusinessLearningSections() {
    return (
        <section className="relative bg-brand-surface-alt px-4 py-8 sm:px-6 sm:py-18 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto max-w-[1100px]">
                <div className="mb-12 px-2 text-center sm:mb-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-textMuted pb-4">
                        Built Differently
                    </p>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 leading-[1.02] sm:text-5xl">
                            What makes us stand out
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col gap-6 pb-10 sm:gap-8 sm:pb-16">
                    <div className="sticky top-20 z-10 sm:top-24">
                        <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_28px_50px_-30px_rgba(0,0,0,0.85)] sm:p-10 lg:p-14">
                            <div className="pointer-events-none absolute right-0 top-0 h-[330px] w-[430px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28)_0%,rgba(59,130,246,0)_66%)]" />

                            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
                                <div>
                                    <h3 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl">
                                        They learn your business.
                                        <br />
                                        Faster than any new hire ever could.
                                    </h3>

                                    <p className="mt-5 max-w-[54ch] text-sm leading-relaxed text-slate-300 sm:text-base">
                                        Bring your AI employees into your workflow with real context. Share your past campaigns, sales
                                        conversations, customer data, and internal docs. Show them how you operate. Every task they
                                        complete adds to that understanding, so output stays aligned with your voice, your offers, and
                                        your standards.
                                    </p>

                                    <p className="mt-5 max-w-[54ch] text-sm leading-relaxed text-slate-300 sm:text-base">
                                        Over time, they do not just follow instructions. They make better decisions. They pick up patterns
                                        in your leads, your content, your customers. You are not resetting tools every week. You are
                                        building a team that gets sharper as your business grows.
                                    </p>
                                </div>

                                <div className="relative hidden h-[320px] lg:block">
                                    {[
                                        { title: "ingesting your business context", top: "2%", left: "2%" },
                                        { title: "looping you in when decisions need input", top: "28%", left: "8%" },
                                        { title: "executing across sales and growth", top: "52%", left: "20%" },
                                        { title: "managing outreach and follow-ups end to end", top: "76%", left: "2%" },
                                    ].map((item, i) => (
                                        <div
                                            key={item.title}
                                            className="absolute flex items-center gap-3 rounded-2xl border border-white/20 bg-[#151515]/80 px-4 py-3 backdrop-blur-sm"
                                            style={{ top: item.top, left: item.left, width: i === 1 || i === 3 ? "82%" : "76%" }}
                                        >
                                            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-bold text-black shadow-[0_4px_14px_rgba(255,255,255,0.18)]">
                                                ✓
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="sticky top-24 z-20 sm:top-28">
                        <article className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-[#f5f5f7] p-6 shadow-[0_24px_45px_-30px_rgba(22,22,22,0.28)] sm:min-h-[420px] sm:p-10 lg:min-h-[460px] lg:p-14">
                            <div className="pointer-events-none absolute -right-10 top-0 h-[260px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(219,38,39,0.18)_0%,rgba(219,38,39,0)_70%)]" />

                            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                                <div className="relative flex overflow-hidden rounded-[1.8rem]sm:h-[320px] lg:h-[355px]">
                                    <img
                                        src="/stack-2.png"
                                        alt="Sales and growth AI workflow"
                                        className="h-auto w-full object-contain sm:h-full sm:object-cover sm:object-bottom"
                                    />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f5f5f7]" />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-semibold leading-[1.08] tracking-tight text-brand-text sm:text-4xl lg:text-[2.9rem]">
                                        Run sales and growth without adding headcount.
                                    </h3>

                                    <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                                        Your AI Sales and Growth employees handle the work that usually needs a team. Prospecting,
                                        outreach, follow-ups, content, campaigns. They operate across channels, stay consistent, and never
                                        drop the ball when volume increases.
                                    </p>

                                    <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                                        No hiring cycles. No training time. No gaps when someone leaves. Just consistent execution that
                                        scales with your revenue. You stay lean while output goes up. That is how you grow without watching
                                        payroll eat your margin.
                                    </p>
                                </div>

                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
