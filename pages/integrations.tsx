import type { GetStaticProps } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { INTEGRATIONS } from "@/lib/pageData";

export default function IntegrationsPage() {
    const available = INTEGRATIONS.filter((i) => i.status === "available");
    const planned = INTEGRATIONS.filter((i) => i.status === "planned");

    return (
        <div className="min-h-screen bg-brand-surface-alt">
            <Navigation />
            <main className="pt-28 pb-16 px-6">
                <section className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-text" />
                        <span className="text-xs font-semibold text-brand-textMuted uppercase tracking-wider">Integrations</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-brand-text mb-5 leading-[1.1]">
                        Invite AI employees into <span className="text-brand-primaryAccent">your existing tools</span>
                    </h1>
                    <p className="text-lg text-brand-textMuted max-w-2xl mx-auto leading-relaxed">
                        No new interface to learn. They work where your team already works.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto mt-14">
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Available Now</h2>
                    <p className="text-brand-textMuted text-sm mb-8">Connect these today.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {available.map((integration) => (
                            <article key={integration.slug} className="p-6 rounded-2xl bg-brand-surface border border-brand-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={integration.logo} alt={integration.name} className="w-8 h-8 object-contain" />
                                    <h3 className="font-bold text-brand-text">{integration.name}</h3>
                                </div>
                                <p className="text-sm text-brand-textMuted leading-relaxed">{integration.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="max-w-6xl mx-auto mt-14">
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Coming Soon</h2>
                    <p className="text-brand-textMuted text-sm mb-8">On the roadmap.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {planned.map((integration) => (
                            <article key={integration.slug} className="p-6 rounded-2xl bg-brand-surface border border-brand-border border-dashed opacity-80">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={integration.logo} alt={integration.name} className="w-8 h-8 object-contain" />
                                    <h3 className="font-bold text-brand-text">{integration.name}</h3>
                                </div>
                                <p className="text-sm text-brand-textMuted leading-relaxed">{integration.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="max-w-4xl mx-auto mt-14 rounded-[2rem] bg-brand-surface border border-brand-border p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-brand-text mb-4">Your AI employees get their own access</h2>
                    <p className="text-brand-textMuted leading-relaxed mb-6">
                        They use dedicated credentials, execute in your apps, and report back where your team works.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-semibold">
                        <button
                            type="button"
                            onClick={() => window.open("https://www.youtube.com/watch?v=QnRtcMGw6d0", "_blank")}
                            className="text-brand-primaryAccent"
                        >
                            See how it works
                        </button>
                        <Link href="/roles" className="text-brand-text">Explore roles</Link>
                    </div>
                </section>
            </main>
            <WaitlistCTA heading="Connect your stack and delegate" subtitle="Your AI employees are ready to work in your tools." />
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => ({ notFound: true });
