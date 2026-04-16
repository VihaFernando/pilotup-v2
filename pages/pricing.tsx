import { useState } from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Cloud, Server, SlidersHorizontal, Plus, X } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistCTA } from "@/components/WaitlistCTA";

type Tier = {
    name: string;
    summary: string;
    monthly: number | null;
    yearly: number | null;
    cta: string;
    featured?: boolean;
    executionLabel: string;
    host: string;
    bullets: string[];
};

const TIERS: Tier[] = [
    {
        name: "Starter",
        summary: "Perfect for exploring the platform and building your first agent. Forever free.",
        monthly: 0,
        yearly: 0,
        cta: "Get Early Access",
        executionLabel: "50,000 credits (One-time)",
        host: "Community Support",
        bullets: [
            "1 Company Profile",
            "3 Active Agents",
            "Forum support",
        ],
    },
    {
        name: "Growth",
        summary: "For startups ready to automate serious workflows.",
        monthly: 149,
        yearly: 119,
        cta: "Get Early Access",
        featured: true,
        executionLabel: "250,000 credits / mo",
        host: "Priority Support",
        bullets: [
            "3 Company Profiles",
            "10 Active Agents",
            "Credit Top-Up Bundles",
        ],
    },
    {
        name: "Executive",
        summary: "Full autonomy for scaling companies with heavy workloads.",
        monthly: 499,
        yearly: 399,
        cta: "Get Early Access",
        executionLabel: "1,000,000 credits / mo",
        host: "Dedicated Account Manager",
        bullets: [
            "Unlimited Companies",
            "25 Active Agents",
            "API Access",
        ],
    },
    {
        name: "Pay as you go",
        summary: "Custom pricing based on your actual usage and workflow needs.",
        monthly: null,
        yearly: null,
        cta: "Contact sales",
        executionLabel: "Pay per workflow usage",
        host: "Custom deployment and support",
        bullets: [
            "Usage-based pricing",
            "Flexible concurrency",
            "Custom data retention",
            "Optional integrations",
        ],
    },
];

const PLAN_COMPARISON = [
    { feature: "Credits", starter: "50,000 (one-time)", growth: "250,000 / month", executive: "1,000,000 / month" },
    { feature: "Company Profiles", starter: "1", growth: "3", executive: "Unlimited" },
    { feature: "Active AI Employees", starter: "3", growth: "10", executive: "25" },
    { feature: "Role Templates", starter: "Basic", growth: "All Templates", executive: "All + Custom" },
    { feature: "Integrations", starter: "3 integrations", growth: "All integrations", executive: "All + API access" },
    { feature: "Support", starter: "Community", growth: "Priority", executive: "Dedicated Manager" },
    { feature: "Credit Top-Ups", starter: "--", growth: "✓", executive: "✓" },
    { feature: "Custom Training", starter: "--", growth: "--", executive: "✓" },
    { feature: "SSO / SAML", starter: "--", growth: "--", executive: "✓" },
    { feature: "SLA", starter: "--", growth: "99.5%", executive: "99.9%" },
];

const PRICING_FAQS = [
    {
        q: "What are credits and how do they work?",
        a: "Credits are the currency that powers your AI employees. Every action -- sending an email, writing a blog post, updating a task -- uses credits. Different tasks use different amounts. The free plan gives you 50,000 one-time credits to explore the platform.",
    },
    {
        q: "Can I switch plans later?",
        a: "Absolutely. You can upgrade, downgrade, or cancel at any time. If you upgrade mid-cycle, you'll be prorated for the remainder. No lock-in contracts.",
    },
    {
        q: "What happens when I run out of credits?",
        a: "Your AI employees will pause until your credits renew at the start of your next billing cycle. On the Growth plan, you can also purchase top-up credit bundles at any time.",
    },
    {
        q: "Is the free plan really free forever?",
        a: "Yes. The Starter plan is free forever with 50,000 one-time credits, 1 company profile, and 3 active agents. Perfect for exploring and building your first AI employee.",
    },
    {
        q: "Do you offer custom enterprise plans?",
        a: "Yes. If you need dedicated infrastructure, custom SLAs, or more than 25 agents, talk to our sales team. We build custom packages for high-scale companies.",
    },
    {
        q: "How does billing work for annual plans?",
        a: "Annual plans offer a 20% discount. You're billed once per year at the discounted rate. The monthly price shown for annual plans reflects the per-month equivalent.",
    },
];

export default function PricingPage() {
    const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    return (
        <div className="min-h-screen bg-[#fdfffc] text-gray-900">
            <Navigation />

            <main className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-8 lg:px-12 xl:px-16">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(55% 40% at 16% 10%, rgb(var(--color-accent-primary) / 0.12), transparent 72%), radial-gradient(48% 42% at 84% 22%, rgba(59,130,246,0.08), transparent 72%), radial-gradient(40% 38% at 78% 88%, rgba(251,191,36,0.08), transparent 72%)",
                    }}
                />

                <div className="relative mx-auto w-full max-w-[1280px]">
                    <section className="mb-6 sm:mb-8 md:mb-10">
                        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600 shadow-sm">
                            Pricing
                        </div>
                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            Pricing
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                            We&apos;re finalizing pricing for our beta users. Lock in these rates early.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 text-sm shadow-[0_6px_18px_-12px_rgba(0,0,0,0.18)]">
                            <button
                                type="button"
                                onClick={() => setBilling("monthly")}
                                className={[
                                    "rounded-full px-3 py-1.5 font-medium transition",
                                    billing === "monthly" ? "bg-gray-900 text-white shadow" : "text-gray-500 hover:text-gray-900",
                                ].join(" ")}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                onClick={() => setBilling("yearly")}
                                className={[
                                    "rounded-full px-3 py-1.5 font-medium transition",
                                    billing === "yearly" ? "bg-gray-900 text-white shadow" : "text-gray-500 hover:text-gray-900",
                                ].join(" ")}
                            >
                                Annually (Save 17%)
                            </button>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
                        {TIERS.map((tier) => {
                            const price = billing === "yearly" ? tier.yearly : tier.monthly;
                            const isContact = price === null;
                            const isFree = price === 0;

                            return (
                                <article
                                    key={tier.name}
                                    className={[
                                        "relative flex h-full flex-col rounded-2xl border p-4 backdrop-blur-xl sm:rounded-3xl sm:p-5",
                                        "bg-white",
                                        tier.featured
                                            ? "border-brand-primaryAccent/35 shadow-[0_24px_70px_-35px_rgba(226,19,57,0.35)]"
                                            : "border-gray-200 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.24)]",
                                    ].join(" ")}
                                >
                                    <div className="mb-2 flex min-h-[32px] items-center gap-2">
                                        <h2 className="text-2xl font-semibold text-gray-900">{tier.name}</h2>
                                        {tier.featured ? (
                                            <span className="inline-flex rounded-full border border-brand-primaryAccent/20 bg-[#ffe5e7] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-primaryAccent">
                                                Recommended
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="mt-1 min-h-[68px] text-sm leading-relaxed text-gray-500">{tier.summary}</p>

                                    <div className="mt-4 min-h-[92px]">
                                        {isContact ? (
                                            <p className="pt-1 text-4xl font-semibold tracking-tight text-gray-900">Contact Sales</p>
                                        ) : (
                                            <p className="text-4xl font-semibold tracking-tight text-gray-900">
                                                ${price}
                                                <span className="ml-1 text-lg font-medium text-gray-500">/mo</span>
                                            </p>
                                        )}
                                        <p className="mt-1 text-sm text-gray-500">
                                            {isContact
                                                ? "Custom terms"
                                                : isFree
                                                    ? "FREE PLAN. FREE FOREVER."
                                                    : billing === "yearly"
                                                        ? "Billed annually"
                                                        : "Billed monthly"}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex min-h-[72px] items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
                                        <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800">{tier.executionLabel}</p>
                                        </div>
                                    </div>

                                    {isContact ? (
                                        <a
                                            href="mailto:marketing@pilotup.io"
                                            className={[
                                                "mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition",
                                                tier.featured
                                                    ? "bg-brand-primaryAccent text-white hover:brightness-90"
                                                    : "bg-gray-900 text-white hover:bg-black",
                                            ].join(" ")}
                                        >
                                            {tier.cta}
                                        </a>
                                    ) : (
                                        <Link
                                            href="/waitlist"
                                            className={[
                                                "mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition",
                                                tier.featured
                                                    ? "bg-brand-primaryAccent text-white hover:brightness-90"
                                                    : "bg-gray-900 text-white hover:bg-black",
                                            ].join(" ")}
                                        >
                                            {tier.cta}
                                        </Link>
                                    )}

                                    <div className="mt-4 min-h-[22px] flex items-center gap-2 text-sm text-gray-600">
                                        {tier.host.includes("self") || tier.host.includes("Self") ? <Server className="h-4 w-4" /> : <Cloud className="h-4 w-4" />}
                                        <span>{tier.host}</span>
                                    </div>

                                    <p className="mt-5 text-sm font-medium text-gray-900">This plan includes:</p>
                                    <ul className="mt-3 space-y-2">
                                        {tier.bullets.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="mt-0.5 rounded-full border border-gray-200 bg-white p-0.5">
                                                    <Check className="h-3 w-3 text-gray-700" />
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            );
                        })}
                    </section>

                    <div className="mt-8 text-center sm:mt-10">
                        <Link href="/waitlist" className="text-sm font-medium text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline">
                            Need custom usage estimates? Talk to our team.
                        </Link>
                    </div>

                    <div className="mx-auto mb-24 mt-14 w-full max-w-5xl sm:mt-20">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Compare plans in detail</h2>
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                            <table className="w-full min-w-[680px] text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="px-6 py-4 text-left font-semibold text-gray-600">Feature</th>
                                        <th className="px-4 py-4 text-center font-semibold text-gray-600">Starter</th>
                                        <th className="bg-gray-100/50 px-4 py-4 text-center font-semibold text-gray-900">Growth</th>
                                        <th className="px-4 py-4 text-center font-semibold text-gray-600">Executive</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PLAN_COMPARISON.map((row, i) => (
                                        <tr key={`${row.feature}-${i}`} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                                            <td className="px-6 py-3.5 font-medium text-gray-700">{row.feature}</td>
                                            <td className="px-4 py-3.5 text-center text-gray-500">{row.starter}</td>
                                            <td className="bg-gray-50/30 px-4 py-3.5 text-center font-medium text-gray-900">{row.growth}</td>
                                            <td className="px-4 py-3.5 text-center text-gray-500">{row.executive}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mx-auto mb-16 w-full max-w-3xl">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pricing FAQ</h2>
                        <div className="flex flex-col gap-4">
                            {PRICING_FAQS.map((faq, idx) => {
                                const isOpen = openFaqIndex === idx;

                                return (
                                    <motion.div
                                        key={`${faq.q}-${idx}`}
                                        layout
                                        initial={false}
                                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                                        className={`relative overflow-hidden cursor-pointer group ${isOpen ? "z-10" : "z-0"}`}
                                    >
                                        <motion.div
                                            layout
                                            className={`relative z-20 flex items-center justify-between gap-6 rounded-[2rem] p-6 transition-colors duration-300 sm:p-8 ${isOpen ? "bg-[#0A0A0A] shadow-2xl" : "border border-gray-200 bg-white/50 shadow-sm hover:bg-gray-50"}`}
                                        >
                                            <motion.h3
                                                layout="position"
                                                className={`flex-1 text-lg font-bold leading-snug transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-900"}`}
                                            >
                                                {faq.q}
                                            </motion.h3>
                                            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0 : 1 }}
                                                    className="absolute"
                                                >
                                                    <Plus className="h-6 w-6 text-gray-400 group-hover:text-gray-900" />
                                                </motion.div>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 0 : -45, opacity: isOpen ? 1 : 0 }}
                                                    className="absolute"
                                                >
                                                    <X className={`h-5 w-5 ${isOpen ? "text-white" : "text-[#E21339]"}`} />
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    className="relative z-10 overflow-hidden"
                                                >
                                                    <div className="mx-2 -mt-6 rounded-b-[2rem] border-x border-b border-gray-100/50 bg-[#F9FAFB] px-6 pb-8 pt-10 sm:px-8">
                                                        <motion.p
                                                            initial={{ y: -10, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            exit={{ y: -10, opacity: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.1 }}
                                                            className="text-sm leading-relaxed text-gray-500 sm:text-base"
                                                        >
                                                            {faq.a}
                                                        </motion.p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <WaitlistCTA
                heading="Start scaling for free"
                subtitle="Create your first AI employee today. No credit card required."
            />

            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return { props: {} };
};
