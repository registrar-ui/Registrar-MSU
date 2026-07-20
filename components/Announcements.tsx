"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, Award, LayoutDashboard, ArrowRight, X } from "lucide-react";
import Reveal from "./Reveal";

const POSTS = [
  {
    date: "Aug 12, 2026",
    category: "Enrollment",
    title: "Second Semester enrollment schedule released",
    icon: ScrollText,
    from: "from-[var(--color-royal)]",
    to: "to-[var(--color-royal-deep)]",
    body: "The Office of the University Registrar has released the official enrollment schedule for the Second Semester, AY 2026–2027. Continuing students are advised to check their assigned enrollment dates through the Student Portal and to settle any outstanding balances beforehand to avoid delays. Late enrollees will be accommodated on a walk-in basis starting the second week of classes, subject to the usual late enrollment fees. For questions about your specific schedule or block assignment, please reach out through the Contact section below.",
  },
  {
    date: "Jul 28, 2026",
    category: "Graduation",
    title: "Graduation clearance window now open",
    icon: Award,
    from: "from-[var(--color-royal-mid)]",
    to: "to-[var(--color-royal)]",
    body: "Candidates for graduation may now process their clearance through the Online Request System or in person at the Registrar's Office. Please secure clearance from all relevant departments — Library, Accounting, Guidance, and your College — before submitting your final clearance form. The deadline for clearance submission is three weeks before the scheduled commencement exercises. Incomplete clearances will not be processed for diploma release.",
  },
  {
    date: "Jul 15, 2026",
    category: "System",
    title: "Online request portal maintenance schedule",
    icon: LayoutDashboard,
    from: "from-[var(--color-royal-deep)]",
    to: "to-[var(--color-royal-mid)]",
    body: "The Online Request System will undergo scheduled maintenance to improve document processing and tracking speed. During this window, new requests cannot be submitted, but previously submitted requests will continue to be processed normally. We apologize for any inconvenience and recommend submitting time-sensitive requests ahead of the maintenance period. Updates will be posted here and on the office's official Facebook page.",
  },
];

export default function Announcements() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? POSTS[activeIndex] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="announcements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="mb-14">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Announcements
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            Latest from the registrar
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="grad-border overflow-hidden h-full">
                <div className={`h-40 bg-gradient-to-br ${p.from} ${p.to} flex items-center justify-center`}>
                  <p.icon size={40} color="#FBBF24" strokeWidth={1.6} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11.5px] text-[var(--color-ink-soft)] font-medium mb-3">
                    <span>{p.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-ink-soft)]" />
                    <span className="text-[var(--color-gold-deep)]">{p.category}</span>
                  </div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-3 leading-snug">{p.title}</h3>
                  <button
                    onClick={() => setActiveIndex(i)}
                    className="text-sm font-semibold text-[var(--color-royal)] inline-flex items-center gap-1.5 group"
                  >
                    Read More
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            onClick={() => setActiveIndex(null)}
          >
            <div className="absolute inset-0 bg-[var(--color-royal-deep)]/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-40 bg-gradient-to-br ${active.from} ${active.to} flex items-center justify-center relative`}>
                <active.icon size={44} color="#FBBF24" strokeWidth={1.6} />
                <button
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 text-[11.5px] text-[var(--color-ink-soft)] font-medium mb-3">
                  <span>{active.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-ink-soft)]" />
                  <span className="text-[var(--color-gold-deep)]">{active.category}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-4 leading-snug">
                  {active.title}
                </h3>
                <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">{active.body}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}