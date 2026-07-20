"use client";

import { motion } from "framer-motion";
import { ScrollText, Award, LayoutDashboard, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const POSTS = [
  {
    date: "Aug 12, 2026",
    category: "Enrollment",
    title: "Second Semester enrollment schedule released",
    icon: ScrollText,
    from: "from-[var(--color-royal)]",
    to: "to-[var(--color-royal-deep)]",
  },
  {
    date: "Jul 28, 2026",
    category: "Graduation",
    title: "Graduation clearance window now open",
    icon: Award,
    from: "from-[var(--color-royal-mid)]",
    to: "to-[var(--color-royal)]",
  },
  {
    date: "Jul 15, 2026",
    category: "System",
    title: "Online request portal maintenance schedule",
    icon: LayoutDashboard,
    from: "from-[var(--color-royal-deep)]",
    to: "to-[var(--color-royal-mid)]",
  },
];

export default function Announcements() {
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
                  <a href="#" className="text-sm font-semibold text-[var(--color-royal)] inline-flex items-center gap-1.5 group">
                    Read More
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
