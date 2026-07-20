"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "Submit Online", desc: "Fill out the request form", gold: false },
  { n: "02", title: "Verification", desc: "Identity and record check", gold: false },
  { n: "03", title: "Processing", desc: "Document prepared and sealed", gold: false },
  { n: "04", title: "Payment", desc: "Settle fees online or on campus", gold: false },
  { n: "05", title: "Release", desc: "Pickup or courier delivery", gold: true },
];

export default function Timeline() {
  const lineRef = useRef(null);
  const inView = useInView(lineRef, { once: true, amount: 0.5 });

  return (
    <section id="requests" className="py-24 bg-[var(--color-mist)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Online Process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            From request to release, five checkpoints
          </h2>
        </Reveal>

        <div className="relative">
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] overflow-hidden bg-[rgba(30,58,138,0.15)]"
          >
            <motion.div
              className="h-full tl-line"
              initial={{ width: "0%" }}
              animate={{ width: inView ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="text-center">
                <div
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center font-mono text-sm font-semibold relative z-10 border-2 ${
                    s.gold
                      ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-[var(--color-royal-deep)]"
                      : "bg-white border-[var(--color-royal)] text-[var(--color-royal)]"
                  }`}
                >
                  {s.n}
                </div>
                <h3 className="font-semibold mt-4">{s.title}</h3>
                <p className="text-[13px] text-[var(--color-ink-soft)] mt-1">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
