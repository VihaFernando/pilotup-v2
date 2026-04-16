import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const FAQS = [
    {
        q: "What exactly is an AI Employee?",
        a: "An AI Employee is a fully autonomous digital worker with a name, email, Slack ID, working hours, and a defined job role. Unlike a chatbot, it proactively performs tasks, attends meetings, and delivers output without waiting for a prompt.",
    },
    {
        q: "Can I talk to them like a real person?",
        a: "Yes. They communicate via Slack, email, or voice chat just like a human colleague. They understand context, nuance, and can even ask clarifying questions if a task is not clear.",
    },
    {
        q: "Can the AI employee join virtual meetings?",
        a: "Absolutely. They can join Zoom, Google Meet, or Teams calls. They listen, transcribe, take structured notes, and can output a list of action items immediately after the call ends.",
    },
    {
        q: "How much oversight do I need to provide?",
        a: "Minimal. You set the high-level goals and permissions. The AI handles the execution. You can check their work log at any time.",
    },
    {
        q: "Is my proprietary data secure?",
        a: "Yes. We use enterprise-grade encryption and strictly isolate your data. We do not train public models on your company proprietary information.",
    },
];

export function WonderingFaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative py-14 sm:py-16 lg:py-20 px-6 w-full max-w-5xl mx-auto bg-brand-surface-alt">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 px-3 py-1 rounded-md bg-brand-primaryAccent/10 text-brand-primaryAccent text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
                >
                    Frequently Asked Questions
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text mb-6 tracking-tight"
                >
                    Wondering About Something? <br />
                    Let&apos;s Clear Things Up!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-brand-textMuted max-w-xl mx-auto"
                >
                    We&apos;ve gathered all the important info right here. Explore our FAQs and
                    find the answers you need.
                </motion.p>
            </div>

            <div className="flex flex-col gap-4">
                {FAQS.map((faq, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <motion.div
                            key={idx}
                            layout
                            initial={false}
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className={`relative overflow-hidden cursor-pointer group ${isOpen ? "z-10" : "z-0"
                                }`}
                        >
                            <motion.div
                                layout
                                className={`relative z-20 flex justify-between items-center gap-6 p-6 sm:p-8 rounded-[2rem] transition-colors duration-300 ${isOpen
                                    ? "bg-black shadow-2xl"
                                    : "bg-brand-surface hover:bg-brand-border/20 border border-brand-border shadow-sm"
                                    }`}
                            >
                                <motion.h3
                                    layout="position"
                                    className={`text-lg sm:text-lg font-bold leading-snug flex-1 transition-colors duration-300 ${isOpen ? "text-white" : "text-brand-text"
                                        }`}
                                >
                                    {faq.q}
                                </motion.h3>

                                <div className="shrink-0 relative w-6 h-6 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0 : 1 }}
                                        className="absolute"
                                    >
                                        <Plus className="w-6 h-6 text-brand-textMuted group-hover:text-brand-text" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 0 : -45, opacity: isOpen ? 1 : 0 }}
                                        className="absolute"
                                    >
                                        <X
                                            className={`w-5 h-5 ${isOpen ? "text-white" : "text-brand-primaryAccent"
                                                }`}
                                        />
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
                                        <div className="bg-brand-surface rounded-b-[2rem] -mt-6 pt-10 pb-8 px-6 sm:px-8 mx-2 border-x border-b border-brand-border/50">
                                            <motion.p
                                                initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="text-brand-textMuted text-sm sm:text-base leading-relaxed"
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
        </section>
    );
}
