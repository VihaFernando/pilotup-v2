import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { FEATURES, getIcon } from "@/lib/pageData";

export default function FeatureDetailPage() {
    const { query } = useRouter();
    const slug = typeof query.slug === "string" ? query.slug : "";
    const feature = FEATURES.find((f) => f.slug === slug);

    if (!feature) {
        return (
            <div className="min-h-screen bg-brand-surface-alt">
                <Navigation />
                <main className="pt-32 px-6 text-center">
                    <h1 className="text-3xl font-bold text-brand-text">Feature not found</h1>
                    <Link href="/features" className="text-brand-primaryAccent font-semibold mt-4 inline-block">Back to features</Link>
                </main>
            </div>
        );
    }

    const Icon = getIcon(feature.icon);
    const others = FEATURES.filter((f) => f.slug !== feature.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7f9fc_55%,#eef3f8_100%)]">
            <Navigation />
            <main className="pt-28 pb-20 px-6 sm:px-8">
                <section className="max-w-7xl mx-auto">
                    <Link href="/features" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-textMuted hover:text-brand-primaryAccent transition pr-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to features
                    </Link>

                    <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-border bg-white/80 backdrop-blur-sm shadow-sm">
                        <Sparkles className="w-4 h-4 text-brand-primaryAccent" />
                        <span className="text-xs font-semibold text-brand-textMuted uppercase tracking-[0.24em]">Feature detail</span>
                    </div>

                    <div className={`mt-6 w-16 h-16 rounded-2xl ${feature.accentSoft} ${feature.accentText} border border-brand-border flex items-center justify-center`}>
                        <Icon className="w-7 h-7" />
                    </div>

                    <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold text-brand-text leading-[0.96] tracking-tight max-w-4xl">{feature.title}</h1>
                    <p className="mt-5 text-base sm:text-lg text-brand-textMuted max-w-3xl leading-relaxed">{feature.heroSubtitle}</p>
                    <p className="mt-6 text-brand-text leading-relaxed max-w-3xl">{feature.detailIntro}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/waitlist" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primaryAccent text-white font-semibold shadow-lg shadow-brand-primaryAccent/20 hover:-translate-y-0.5 transition">
                            Join Waitlist
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href="#how-it-works" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-border bg-white/80 text-brand-text font-semibold hover:border-brand-primaryAccent/30 transition">
                            See how it works
                        </a>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto mt-16 sm:mt-20">
                    <div className="relative rounded-[2rem] border border-brand-border bg-white/85 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.10)] p-6 sm:p-8">
                        <div className={`h-2 rounded-full bg-gradient-to-r ${feature.accentGradient} mb-5`} />
                        <div className="rounded-3xl bg-brand-surface-alt/80 border border-brand-border p-6 sm:p-8">
                            <p className="text-sm font-semibold text-brand-textMuted uppercase tracking-[0.22em]">Quick view</p>
                            <h2 className="mt-2 text-2xl font-bold text-brand-text">{feature.shortTitle}</h2>
                            <p className="mt-3 text-sm text-brand-textMuted leading-relaxed">{feature.description}</p>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            {feature.stats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-brand-border bg-white p-4">
                                    <p className="text-xs font-semibold text-brand-textMuted uppercase tracking-[0.18em]">{stat.label}</p>
                                    <p className="mt-2 text-sm font-bold text-brand-text">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 rounded-3xl border border-brand-border bg-gradient-to-br from-white to-brand-surface-alt/70 p-5 sm:p-6">
                            <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.22em]">What it unlocks</p>
                            <div className="mt-4 space-y-3">
                                {feature.outcomes.map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-brand-border p-3">
                                        <div className={`mt-0.5 h-6 w-6 rounded-full ${feature.accentSoft} ${feature.accentText} flex items-center justify-center shrink-0`}>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <p className="text-sm text-brand-textMuted leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="max-w-7xl mx-auto mt-16 sm:mt-20">
                    <div className="max-w-3xl mb-8 sm:mb-10">
                        <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.24em]">Core shift</p>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-text tracking-tight">The part that changes the operating model.</h2>
                        <p className="mt-4 text-brand-textMuted leading-relaxed max-w-2xl">{feature.detailIntro}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
                        {feature.sections.map((section) => (
                            <article key={section.title} className="rounded-[1.75rem] border border-brand-border bg-white/90 p-5 sm:p-6 shadow-sm h-full min-h-[16.5rem] flex flex-col">
                                <div className={`w-10 h-10 rounded-2xl ${feature.accentSoft} ${feature.accentText} flex items-center justify-center mb-4`}>
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-brand-text leading-snug min-h-[3.5rem]">{section.title}</h3>
                                <p className="mt-2 text-sm text-brand-textMuted leading-relaxed min-h-[4rem]">{section.body}</p>
                                <ul className="mt-4 space-y-2 flex-1">
                                    {section.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-2 text-sm text-brand-textMuted leading-relaxed">
                                            <span className={`mt-1 h-2 w-2 rounded-full ${feature.accentSoft} ${feature.accentText} shrink-0`} />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="max-w-7xl mx-auto mt-16 sm:mt-20 grid lg:grid-cols-[1fr_1fr] gap-6 sm:gap-8">
                    <div className="rounded-[2rem] border border-brand-border bg-white/85 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                        <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.24em]">Examples</p>
                        <h2 className="mt-3 text-3xl font-bold text-brand-text tracking-tight">What this looks like in practice.</h2>
                        <div className="mt-6 space-y-3">
                            {feature.examples.map((example) => (
                                <div key={example} className="rounded-2xl border border-brand-border bg-brand-surface-alt/60 px-4 py-3 text-sm text-brand-textMuted leading-relaxed">
                                    {example}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-brand-border bg-white/85 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
                        <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.24em]">Outcomes</p>
                        <h2 className="mt-3 text-3xl font-bold text-brand-text tracking-tight">The Result this feature is built to create.</h2>
                        <div className="mt-6 grid gap-3">
                            {feature.outcomes.map((outcome) => (
                                <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-surface-alt/60 p-4">
                                    <div className={`mt-0.5 h-6 w-6 rounded-full ${feature.accentSoft} ${feature.accentText} flex items-center justify-center shrink-0`}>
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm text-brand-textMuted leading-relaxed">{outcome}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto mt-16 sm:mt-20 rounded-[2rem] border border-brand-border bg-white/85 backdrop-blur-sm p-7 sm:p-10 shadow-sm">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <p className="text-sm font-semibold text-brand-primaryAccent uppercase tracking-[0.24em]">Related features</p>
                            <h2 className="mt-3 text-3xl font-bold text-brand-text tracking-tight">Other PilotUP capabilities</h2>
                        </div>
                        <div className={`hidden sm:flex h-12 w-12 rounded-2xl ${feature.accentSoft} ${feature.accentText} items-center justify-center`}>
                            <Sparkles className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
                        {others.map((item) => {
                            const OtherIcon = getIcon(item.icon);
                            return (
                                <Link key={item.slug} href={`/features/${item.slug}`} className="group rounded-[1.5rem] border border-brand-border bg-brand-surface-alt/60 p-5 transition-all hover:-translate-y-1 hover:border-brand-primaryAccent/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                                    <div className={`w-11 h-11 rounded-2xl ${item.accentSoft} ${item.accentText} flex items-center justify-center mb-4`}>
                                        <OtherIcon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-brand-text">{item.shortTitle}</h3>
                                    <p className="mt-2 text-sm text-brand-textMuted leading-relaxed">{item.description}</p>
                                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primaryAccent">
                                        Open feature
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
            <WaitlistCTA heading={`Experience ${feature.shortTitle}`} subtitle="See how PilotUP handles this capability as part of a full AI employee operating model." />
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: FEATURES.map((feature) => ({ params: { slug: feature.slug } })),
    fallback: false,
});
