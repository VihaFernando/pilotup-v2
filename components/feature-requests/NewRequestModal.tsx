"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, X } from "lucide-react";
import type { RequestPriority } from "@/lib/featureRequests";

const PRIORITY: { value: RequestPriority; label: string; hint: string }[] = [
  { value: "low", label: "Low", hint: "Nice to have" },
  { value: "medium", label: "Medium", hint: "Should have" },
  { value: "high", label: "High", hint: "Blocking" },
];

type NewRequestModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: { text: string; priority: RequestPriority }) => void;
};

function PriorityIcon({ p, active }: { p: RequestPriority; active: boolean }) {
  const c = active ? "text-brand-primaryAccent" : "text-brand-textMuted group-hover:text-brand-text";
  if (p === "low") {
    return (
      <svg className={c} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 1.5L14.5 8L8 14.5L1.5 8L8 1.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }
  if (p === "medium") {
    return (
      <svg className={c} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 1.5L14.5 8L8 14.5L1.5 8L8 1.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg className={c} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5L14.5 8L8 14.5L1.5 8L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <text x="8" y="11" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" fontFamily="system-ui">
        !
      </text>
    </svg>
  );
}

export function NewRequestModal({ open, onClose, onSubmit }: NewRequestModalProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<RequestPriority>("medium");
  const titleId = useId();
  const fileInputId = useId();

  const handleClose = useCallback(() => {
    onClose();
    setText("");
    setPriority("medium");
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, handleClose]);

  const submit = () => {
    const t = text.trim();
    if (!t) {
      return;
    }
    onSubmit({ text: t, priority });
    handleClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="fr-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="fr-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brand-border/80 px-5 py-4">
              <h2 id={titleId} className="text-base font-semibold text-brand-text sm:text-lg">
                Submit a request
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-brand-textMuted transition hover:bg-slate-100 hover:text-brand-text"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="relative min-h-[120px] rounded-xl border border-brand-border/90 bg-slate-50/80 focus-within:border-brand-primaryAccent/50 focus-within:ring-2 focus-within:ring-brand-primaryAccent/15">
                <label htmlFor="fr-body" className="sr-only">
                  Your request
                </label>
                <textarea
                  id="fr-body"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="I&apos;d like to see…"
                  rows={4}
                  className="w-full resize-none border-0 bg-transparent px-4 py-3.5 pr-10 text-sm leading-relaxed text-brand-text placeholder:text-brand-textMuted/80 focus:outline-none sm:text-base"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <input id={fileInputId} type="file" className="sr-only" multiple />
                  <label
                    htmlFor={fileInputId}
                    className="inline-flex cursor-pointer rounded-md p-2 text-brand-textMuted transition hover:bg-white/80 hover:text-brand-text"
                    title="Attachments (local only)"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Add attachment</span>
                  </label>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-medium text-brand-textMuted">Priority</p>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITY.map((item) => {
                      const active = priority === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setPriority(item.value)}
                          className={[
                            "group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition",
                            active
                              ? "border-brand-primaryAccent/50 bg-brand-primaryAccent/8 text-brand-text"
                              : "border-brand-border/90 bg-white text-brand-textMuted hover:border-brand-border hover:text-brand-text",
                          ].join(" ")}
                        >
                          <PriorityIcon p={item.value} active={active} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={submit}
                  disabled={!text.trim()}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full bg-brand-primaryAccent text-white transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Submit request"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 5v14M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
