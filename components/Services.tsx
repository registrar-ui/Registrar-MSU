"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DOCUMENTS } from "@/lib/documents";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[var(--color-mist)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Quick Services
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            Everything you need, one request away
          </h2>
          <p className="text-[var(--color-ink-soft)] mt-4">
            Click a document below to start your online request — no queueing, no guesswork,
            just a clear path from submission to release.
          </p>
        </Reveal>

        <div id="about" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCUMENTS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 80}>
              <Link href={`/request/${s.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="grad-border p-6 h-full cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-royal)]/10 flex items-center justify-center mb-5">
                    <s.icon size={22} color="#1E3A8A" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-[var(--color-ink)] mb-1.5">{s.title}</h3>
                  <p className="text-[13.5px] text-[var(--color-ink-soft)] leading-relaxed">{s.desc}</p>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}