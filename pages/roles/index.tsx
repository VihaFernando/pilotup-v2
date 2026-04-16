import type { GetStaticProps } from "next";
import Link from "next/link";
import { Sparkles, Search, Settings } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { ROLES } from "@/lib/pageData";

export default function RolesPage() {
    return (
        <div className="min-h-screen bg-brand-surface-alt">
            <Navigation />
            <main className="pt-28 pb-16 px-6">
                <section className="max-w-4xl mx-auto text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primaryAccent" />
                        <span className="text-xs font-semibold text-brand-textMuted uppercase tracking-wider">Roles</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-brand-text mb-5 leading-[1.1]">
                        Build the team you need <span className="text-brand-primaryAccent">one role at a time</span>
                    </h1>
                    <p className="text-lg text-brand-textMuted max-w-2xl mx-auto leading-relaxed">
                        Each AI employee is role-specialized and ready to execute in your workflow.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ROLES.map((role) => {
                        const Icon =
                            role.slug === "growth-content-lead"
                                ? Sparkles
                                : role.slug === "support-research-lead"
                                    ? Search
                                    : Settings;
                        return (
                            <Link key={role.slug} href={`/roles/${role.slug}`} className="group rounded-[2rem] bg-brand-surface border border-brand-border p-7 hover:border-brand-primaryAccent/40 transition-colors">
                                <div className={`w-12 h-12 rounded-xl ${role.iconBg} flex items-center justify-center mb-5`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-brand-text mb-2">{role.shortTitle}</h2>
                                <p className="text-sm text-brand-textMuted leading-relaxed mb-6">{role.description}</p>
                                <span className="text-sm font-semibold text-brand-primaryAccent">Learn more</span>
                            </Link>
                        );
                    })}
                </section>

                <section className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center gap-4 text-sm font-semibold">
                    <Link href="/functions" className="text-brand-text hover:text-brand-primaryAccent transition">Explore by function</Link>
                    <Link href="/features" className="text-brand-text hover:text-brand-primaryAccent transition">View features</Link>
                    <Link href="/pricing" className="text-brand-text hover:text-brand-primaryAccent transition">See pricing</Link>
                </section>
            </main>
            <WaitlistCTA heading="Build the perfect team" subtitle="Start with one role and scale function by function." />
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
