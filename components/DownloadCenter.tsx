"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import Reveal from "./Reveal";

const FILES = [
  { title: "Application Forms", meta: "PDF · 210 KB" },
  { title: "Clearance Forms", meta: "PDF · 180 KB" },
  { title: "Request Forms", meta: "PDF · 150 KB" },
  { title: "Graduation Forms", meta: "PDF · 240 KB" },
  { title: "Student Handbook", meta: "PDF · 3.1 MB" },
  { title: "Academic Calendar", meta: "PDF · 90 KB" },
];

export default function DownloadCenter() {
  return (
    <section id="downloads" className="py-24 bg-[var(--color-mist)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Download Center
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            Forms, ready when you need them
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FILES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80}>
              <motion.a whileHover={{ y: -6 }} href="#" className="grad-border p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-[13px] text-[var(--color-ink-soft)]">{f.meta}</p>
                </div>
                <ArrowDownToLine size={20} color="#1E3A8A" strokeWidth={2} />
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
