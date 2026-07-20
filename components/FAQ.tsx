"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "How long does a Transcript of Records request take?",
    a: "Standard TOR requests are typically released within 5–7 working days after verification and payment. Rush processing is available for urgent cases.",
  },
  {
    q: "Can I pay for my request online?",
    a: "Yes. The Online Request System accepts digital payment channels, or you may pay directly at the cashier's office on release day.",
  },
  {
    q: "How do I track the status of my request?",
    a: "Use the Track Request link with your reference number to see real-time status — from verification through release.",
  },
  {
    q: "Do you offer document authentication assistance?",
    a: "Yes, the office assists with CHED and DFA red-ribbon authentication requirements for documents intended for use abroad.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24 bg-[var(--color-mist)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            FAQs
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 80}>
                <div className="bg-white rounded-2xl shadow-sm">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
                  >
                    {f.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="text-[var(--color-gold-deep)] shrink-0"
                    >
                      <Plus size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
