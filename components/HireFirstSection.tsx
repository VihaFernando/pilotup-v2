import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const LOGOS = [
    {
        name: "Slack",
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
    {
        name: "Gmail",
        src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    },
    {
        name: "Notion",
        src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    },
    {
        name: "Figma",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    },
    {
        name: "HubSpot",
        src: "https://www.svgrepo.com/show/331433/hubspot.svg",
    },
];

export function HireFirstSection() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleJoin = () => {
        if (!email.trim()) {
            setError("Enter your email");
            return;
        }

        setError("");
    };

    return (
        <section
            id="join"
            className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 w-full max-w-[1280px] mx-auto overflow-hidden"
        >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-primaryAccent/10 text-brand-primaryAccent text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6"
                    >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-primaryAccent animate-pulse" />
                        Exclusive Early Access
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-text mb-4 sm:mb-6 tracking-tight leading-[1.1]"
                    >
                        Hire your first
                        <br className="hidden sm:block" />{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primaryAccent to-brand-primaryAccent/75">
                            AI Employee.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-sm sm:text-lg text-brand-textMuted leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 sm:mb-10"
                    >
                        Founders are already preparing to scale smarter. Join the waiting list and
                        be next.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative flex items-center w-full max-w-md mx-auto lg:mx-0 p-1 rounded-full backdrop-blur-2xl backdrop-saturate-150 border border-brand-border/60 bg-gradient-to-b from-brand-surface to-brand-surface-alt shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_4px_20px_rgba(0,0,0,0.06)] focus-within:shadow-[0_8px_30px_rgba(226,19,57,0.15)] transition-all duration-300"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email..."
                            className="flex-grow px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-brand-text placeholder:text-brand-textMuted bg-transparent outline-none rounded-full min-w-0"
                        />
                        <button
                            type="button"
                            onClick={handleJoin}
                            className="group flex items-center justify-center w-10 h-10 sm:w-auto sm:px-6 sm:h-12 bg-brand-text text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-lg shrink-0"
                        >
                            <span className="hidden sm:block font-semibold mr-2 text-sm">Join Waitlist</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {error && (
                        <p className="mt-4 text-[10px] sm:text-xs text-brand-primaryAccent sm:ml-6 flex items-center justify-center lg:justify-start gap-1">
                            {error}
                        </p>
                    )}

                    <p className="mt-4 text-[10px] sm:text-xs text-brand-textMuted sm:ml-6 flex items-center justify-center lg:justify-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        No credit card required
                    </p>
                </div>

                <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto">
                    <div className="grid grid-cols-2 gap-3 sm:gap-5">
                        <div className="flex flex-col gap-3 sm:gap-5 sm:mt-12">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-brand-surface border border-brand-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] flex flex-col justify-between h-full"
                            >
                                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-brand-primaryAccent/10 flex items-center justify-center mb-2 sm:mb-4 text-brand-primaryAccent">
                                    <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-brand-text mb-0.5 sm:mb-1 break-words whitespace-normal">
                                        Early Access
                                    </div>
                                    <div className="text-xs sm:text-sm font-medium text-brand-textMuted leading-tight">
                                        Join the founder waitlist
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-brand-text text-white shadow-[0_10px_30px_-10px_rgba(17,24,39,0.3)] flex flex-col justify-center h-full"
                            >
                                <div className="text-xl sm:text-2xl font-bold mb-1 text-white break-words whitespace-normal">
                                    Enterprise Secure
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-white/70 leading-tight mb-3">
                                    Bank-grade encryption and data isolation
                                </div>
                                <div className="h-1 sm:h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                                    <div className="h-full w-[20%] bg-emerald-400 rounded-full" />
                                </div>
                            </motion.div>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-5">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-brand-primaryAccent to-brand-primaryAccent/80 text-white shadow-[0_10px_30px_-10px_rgba(226,19,57,0.3)] flex flex-col justify-center h-full"
                            >
                                <div className="text-xl sm:text-2xl font-bold mb-1 break-words whitespace-normal">
                                    Automates Operations
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-white/80 leading-tight">
                                    Handles repetitive work like triage, summaries and updates
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-brand-surface border border-brand-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] flex flex-col justify-center h-full"
                            >
                                <div className="flex items-center gap-3 mb-3 flex-wrap">
                                    {LOGOS.slice(0, 5).map((logo, i) => (
                                        <div
                                            key={i}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center border border-brand-border shadow-sm overflow-hidden flex-shrink-0"
                                        >
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="w-full h-full object-contain p-[2px]"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="text-xs sm:text-sm font-medium text-brand-textMuted leading-tight break-words">
                                    Integrates with Slack, Gmail, Notion, Figma and more
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
