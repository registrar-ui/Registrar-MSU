"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "My TOR request was processed faster than I expected — I could track every step online.",
    name: "Maria D.",
    role: "BS Marine Biology",
  },
  {
    quote: "The download center saved me a trip to campus just to get a clearance form.",
    name: "Jerome A.",
    role: "BS Fisheries",
  },
  {
    quote: "Staff were patient and answered every question I had about authentication.",
    name: "Angel S.",
    role: "BS Agriculture",
  },
  {
    quote: "Clear timelines, no surprises. Exactly what a registrar office should feel like.",
    name: "Kevin L.",
    role: "BS Information Technology",
  },
];

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div
      className="w-80 shrink-0 rounded-2xl p-6"
      style={{ background: "rgba(30,58,138,.06)", border: "1px solid rgba(30,58,138,.12)" }}
    >
      <div className="flex gap-1 mb-3 text-[var(--color-gold)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="#FBBF24" color="#FBBF24" />
        ))}
      </div>
      <p className="text-[14px] text-[var(--color-ink-soft)] leading-relaxed mb-4">{t.quote}</p>
      <p className="font-semibold text-sm">{t.name}</p>
      <p className="text-[12px] text-[var(--color-ink-soft)]">{t.role}</p>
    </div>
  );
}

export default function Testimonials() {
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            What students say
          </h2>
        </Reveal>
      </div>

      <div className="relative max-w-full overflow-hidden">
        <motion.div
          className="flex gap-6 w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {track.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
