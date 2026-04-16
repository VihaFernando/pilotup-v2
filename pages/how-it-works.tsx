import type { GetStaticProps } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";

const STEPS = [
    "Create an account",
    "Set up your company profile",
    "Build your first AI employee",
    "Connect your tools",
    "Assign tasks and start scaling",
];

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-brand-surface-alt">
            <Navigation />
            <main className="pt-28 pb-16 px-6">
                <section className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-text" />
                        <span className="text-xs font-semibold text-brand-textMuted uppercase tracking-wider">How It Works</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-brand-text mb-5 leading-[1.1]">
                        From sign-up to <span className="text-brand-primaryAccent">scaled team</span>
                    </h1>
                    <p className="text-lg text-brand-textMuted max-w-2xl mx-auto leading-relaxed">
                        No complex setup. Build your first AI employee and start delegating in minutes.
                    </p>
                </section>

                <section className="max-w-5xl mx-auto mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {STEPS.map((step, idx) => (
                        <article key={step} className="rounded-2xl bg-brand-surface border border-brand-border p-5">
                            <div className="text-brand-primaryAccent font-bold text-sm mb-2">0{idx + 1}</div>
                            <h2 className="text-brand-text font-semibold text-sm leading-snug">{step}</h2>
                        </article>
                    ))}
                </section>

                <section className="max-w-4xl mx-auto mt-14 rounded-[2rem] bg-brand-surface border border-brand-border p-8 sm:p-12 text-center">
                    <h2 className="text-3xl font-bold text-brand-text mb-4">Ready to build your first AI employee?</h2>
                    <p className="text-brand-textMuted mb-7">Join the waitlist and get early access.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href="/waitlist" className="px-7 py-3 rounded-xl bg-brand-primaryAccent text-white font-semibold text-sm">Join Waitlist</Link>
                        <Link href="/roles" className="px-7 py-3 rounded-xl border border-brand-border text-brand-text font-semibold text-sm">Explore Roles</Link>
                    </div>
                </section>
            </main>
            <WaitlistCTA heading="Start in five simple steps" subtitle="Move from setup to execution quickly with PilotUP." />
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
