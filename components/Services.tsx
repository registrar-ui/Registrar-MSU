"use client";

import { motion } from "framer-motion";
import { FileText, ClipboardCheck, GraduationCap, ShieldCheck, Award, FolderOpen, BadgeCheck, ScrollText } from "lucide-react";
import Reveal from "./Reveal";

const SERVICES = [
  { icon: FileText, title: "Transcript of Records", desc: "Official, sealed copies of your complete academic record." },
  { icon: ClipboardCheck, title: "Certificate of Enrollment", desc: "Proof of current enrollment for scholarships and employment." },
  { icon: GraduationCap, title: "Diploma", desc: "Replacement and certified true copies of your diploma." },
  { icon: ShieldCheck, title: "Authentication", desc: "CHED / DFA red-ribbon authentication assistance." },
  { icon: Award, title: "Graduation", desc: "Application for graduation and clearance processing." },
  { icon: FolderOpen, title: "Student Records", desc: "Access and correction requests for your academic file." },
  { icon: BadgeCheck, title: "Good Moral", desc: "Certificate of good moral character for transfer or work." },
  { icon: ScrollText, title: "Certifications", desc: "General certifications for units earned, honors, and more." },
];

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
            Request academic documents online — no queueing, no guesswork, just a clear path
            from submission to release.
          </p>
        </Reveal>

        <div id="about" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 80}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="grad-border p-6 h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-royal)]/10 flex items-center justify-center mb-5">
                  <s.icon size={22} color="#1E3A8A" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-[var(--color-ink)] mb-1.5">{s.title}</h3>
                <p className="text-[13.5px] text-[var(--color-ink-soft)] leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
