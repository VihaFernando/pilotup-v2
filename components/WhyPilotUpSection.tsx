import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Brain, Workflow, BarChart3, Zap } from "lucide-react";

const ROTATING_WORDS = ["Sales", "Marketing", "Support", "Research", "Operations", "Development"];

const VALUE_PROPS_DEEP = [
  {
    icon: Users,
    title: "Build an entire team of AI Employees",
    desc: "Build AI Employees that can handle any use case, across any industry",
  },
  {
    icon: Briefcase,
    title: "Built for all business tasks",
    desc: "Your AI Employees does everything from A - Z to ensure your business runs towards success.",
  },
  {
    icon: Brain,
    title: "Human-quality output",
    desc: "Your AI Employee matches your tone of voice, and improves with every task.",
  },
  {
    icon: Workflow,
    title: "Collaborates with the team",
    desc: "Your AI Employees work together on certain tasks collaboratively.",
  },
  {
    icon: BarChart3,
    title: "Built for any Business",
    desc: "AI Employees can handle any workflows from a new startup to an enterprise level.",
  },
  {
    icon: Zap,
    title: "Results from day one",
    desc: "Your AI Employee starts delivering on its first assignment, and keeps going 24/7 without breaks.",
  },
];

export function WhyPilotUpSection() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-brand-surface-alt pb-24 pt-14 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 text-3xl font-bold text-brand-text sm:text-4xl lg:text-5xl"
          >
            Scale your{" "}
            <span className="relative inline-flex h-[1.2em] overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIdx]}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-block text-brand-primaryAccent"
                >
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-brand-textMuted"
          >
            and watch your business grow towards success
          </motion.p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          {VALUE_PROPS_DEEP.map((prop, i) => {
            const IconComp = prop.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.08 * i, duration: 0.45 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface">
                  <IconComp className="h-5 w-5 text-brand-textMuted" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-text">{prop.title}</h3>
                <p className="text-sm leading-relaxed text-brand-textMuted">{prop.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/waitlist"
            className="rounded-xl bg-brand-primaryAccent px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primaryAccent/90"
          >
            Get Started - It&apos;s Free
          </Link>

          <button
            type="button"
            onClick={() => window.open("https://www.youtube.com/watch?v=QnRtcMGw6d0", "_blank")}
            className="rounded-xl border border-brand-border bg-transparent px-7 py-3.5 text-sm font-semibold text-brand-text transition hover:bg-brand-border/15"
          >
            See how it works
          </button>
        </motion.div>
      </div>
    </section>
  );
}
