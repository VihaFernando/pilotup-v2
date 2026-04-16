import Link from "next/link";
import { ArrowRight } from "lucide-react";

type WaitlistCTAProps = {
    heading: string;
    subtitle: string;
};

export function WaitlistCTA({ heading, subtitle }: WaitlistCTAProps) {
    return (
        <section className="py-16 sm:py-24 px-6 bg-brand-surface-alt">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primaryAccent/10 border border-brand-primaryAccent/20 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primaryAccent" />
                    <span className="text-xs font-semibold text-brand-primaryAccent uppercase tracking-wider">Early Access</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold text-brand-text mb-5 tracking-tight">{heading}</h2>
                <p className="text-base sm:text-lg text-brand-textMuted max-w-2xl mx-auto leading-relaxed mb-8">{subtitle}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/waitlist"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-primaryAccent text-white font-semibold text-sm hover:bg-brand-primaryAccent/90 transition"
                    >
                        Join Waitlist
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-brand-border text-brand-text font-semibold text-sm hover:bg-brand-border/20 transition"
                    >
                        View Pricing
                    </Link>
                </div>
            </div>
        </section>
    );
}
