import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle2, Sparkles, Search, Settings } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { INTEGRATIONS, ROLES } from "@/lib/pageData";

export default function RoleDetailPage() {
    const { query } = useRouter();
    const slug = typeof query.slug === "string" ? query.slug : "";
    const role = ROLES.find((r) => r.slug === slug);

    if (!role) {
        return (
            <div className="min-h-screen bg-brand-surface-alt">
                <Navigation />
                <main className="pt-32 px-6 text-center">
                    <h1 className="text-3xl font-bold text-brand-text">Role not found</h1>
                    <Link href="/roles" className="text-brand-primaryAccent font-semibold mt-4 inline-block">Back to roles</Link>
                </main>
            </div>
        );
    }

    const Icon =
        role.slug === "growth-content-lead"
            ? Sparkles
            : role.slug === "support-research-lead"
                ? Search
                : Settings;

    return (
        <div className="min-h-screen bg-brand-surface-alt">
            <Navigation />
            <main className="pt-28 pb-16 px-6">
                <section className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-primaryAccent/10 border border-brand-primaryAccent/20 flex items-center justify-center mx-auto mb-7 text-brand-primaryAccent">
                        <Icon className="w-7 h-7" />
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-brand-text mb-5 leading-[1.1]">{role.title}</h1>
                    <p className="text-lg text-brand-textMuted max-w-2xl mx-auto leading-relaxed mb-8">{role.heroSubtitle}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href="/waitlist" className="px-7 py-3 rounded-xl bg-brand-primaryAccent text-white font-semibold text-sm">Build this employee</Link>
                        <Link href="/roles" className="px-7 py-3 rounded-xl border border-brand-border text-brand-text font-semibold text-sm">Explore all roles</Link>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto mt-14 grid sm:grid-cols-2 gap-4">
                    {role.whatTheyDo.map((item) => (
                        <article key={item} className="p-5 rounded-xl bg-brand-surface border border-brand-border flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-brand-primaryAccent mt-0.5" />
                            <p className="text-sm text-brand-text leading-relaxed">{item}</p>
                        </article>
                    ))}
                </section>

                <section className="max-w-6xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold text-brand-text mb-4">Where they work</h2>
                    <div className="flex flex-wrap gap-3">
                        {role.whereTheyWork.map((tool) => {
                            const integration = INTEGRATIONS.find((i) => i.name === tool);
                            return (
                                <div key={tool} className="px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-sm text-brand-text font-semibold inline-flex items-center gap-2">
                                    {integration ? <img src={integration.logo} alt={tool} className="w-4 h-4 object-contain" /> : null}
                                    {tool}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
            <WaitlistCTA heading={`Build your ${role.shortTitle}`} subtitle="Deploy this role and start delegating immediately." />
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: ROLES.map((role) => ({ params: { slug: role.slug } })),
    fallback: false,
});
