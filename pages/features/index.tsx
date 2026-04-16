import type { GetStaticProps } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { FEATURES, getIcon } from "@/lib/pageData";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7f9fc_55%,#eef3f8_100%)]">
            <Navigation />
            <main className="pt-28 pb-20 px-6 sm:px-8">
                <section className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-border bg-white/80 backdrop-blur-sm shadow-sm mb-6">
                        <Sparkles className="w-4 h-4 text-brand-primaryAccent" />
                        <span className="text-xs font-semibold text-brand-textMuted uppercase tracking-[0.24em]">PilotUP features</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-brand-text leading-[0.96] tracking-tight max-w-4xl">
                        AI employees built to own work, run nonstop, and grow with your business.
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-brand-textMuted max-w-2xl leading-relaxed">
                        Each feature is designed to replace busywork with real execution. No pictures, no gimmicks, no generic AI promises. Just a clearer operating model for how work actually gets done.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/waitlist"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primaryAccent text-white font-semibold shadow-lg shadow-brand-primaryAccent/20 hover:-translate-y-0.5 transition"
                        >
                            Join Waitlist
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="#feature-grid"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-brand-border bg-white/80 text-brand-text font-semibold hover:border-brand-primaryAccent/30 transition"
                        >
                            Explore features
                        </a>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto mt-16 sm:mt-20">
                    <div className="relative rounded-[2rem] border border-brand-border bg-white/85 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.10)] p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
                            <div className="max-w-2xl">
                                <p className="text-sm font-semibold text-brand-textMuted uppercase tracking-[0.22em]">Operating model</p>
                                <p className="mt-2 text-3xl sm:text-4xl font-bold text-brand-text leading-tight">A team of AI employees, not a stack of tools.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-brand-primaryAccent/10 text-brand-primaryAccent flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-brand-text">Key behaviors</p>
                                    <p className="text-sm text-brand-textMuted">Aligned around execution, not isolated capabilities.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {FEATURES.slice(0, 4).map((feature) => {
                                const Icon = getIcon(feature.icon);
                                return (
                                    <div key={feature.slug} className="rounded-3xl border border-brand-border bg-white p-5 shadow-sm">
                                        <div className={`w-11 h-11 rounded-2xl ${feature.accentSoft} ${feature.accentText} flex items-center justify-center mb-4`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-sm font-semibold text-brand-text">{feature.shortTitle}</p>
                                        <p className="mt-2 text-sm text-brand-textMuted leading-relaxed">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section id="feature-grid" className="max-w-7xl mx-auto mt-16 sm:mt-20">
                    <div className="max-w-3xl mb-8 sm:mb-10">
                        <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.24em]">Feature set</p>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-text tracking-tight">Eight capabilities built around real business execution.</h2>
                        <p className="mt-4 text-brand-textMuted leading-relaxed">
                            The pages below explain what each feature changes, how it works, and the outcome it unlocks. The language stays close to how founders and operators actually think.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {FEATURES.map((feature) => {
                            const Icon = getIcon(feature.icon);
                            return (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="group rounded-3xl border border-brand-border/80 bg-white/90 backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primaryAccent/35 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]"
                                >
                                    <div className="grid h-full grid-rows-[auto_auto_1fr_auto]">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`w-10 h-10 rounded-xl ${feature.accentSoft} ${feature.accentText} flex items-center justify-center`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-brand-textMuted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-primaryAccent" />
                                        </div>

                                        <h3 className="text-base font-semibold text-brand-text leading-snug min-h-[2.75rem]">
                                            {feature.shortTitle}
                                        </h3>
                                        <p className="mt-2 text-[13px] leading-relaxed text-brand-textMuted min-h-[4.5rem]">
                                            {feature.description}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {feature.outcomes.slice(0, 1).map((outcome) => (
                                                <span key={outcome} className={`inline-flex items-center rounded-full ${feature.accentSoft} ${feature.accentText} px-2.5 py-1 text-[11px] font-medium`}>
                                                    {outcome}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="max-w-7xl mx-auto mt-16 sm:mt-20 rounded-[2rem] border border-brand-border bg-white/80 backdrop-blur-sm p-7 sm:p-10 shadow-sm">
                    <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
                        <div>
                            <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.24em]">Why it feels different</p>
                            <h2 className="mt-3 text-3xl font-bold text-brand-text tracking-tight">PilotUP is designed to feel like hiring, not configuring software.</h2>
                            <p className="mt-4 text-brand-textMuted leading-relaxed">
                                The feature set is organized around ownership, autonomy, team coordination, and margin. That keeps the experience focused on outcomes instead of menus and setup complexity.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "No picture-led marketing sections",
                                "Clear task ownership language",
                                "Business-first outcomes",
                                "Responsive layouts that stack cleanly",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-surface-alt/60 p-4">
                                    <div className="h-6 w-6 rounded-full bg-brand-primaryAccent/10 text-brand-primaryAccent flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm text-brand-textMuted leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <WaitlistCTA heading="Experience feature-first AI work" subtitle="Use capabilities designed for real execution, not just chat." />
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
