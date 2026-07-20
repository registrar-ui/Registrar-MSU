"use client";

import { Zap, ShieldCheck, Laptop, UserCheck, BadgeCheck, Repeat } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  { icon: Zap, title: "Fast Processing", desc: "Most requests move from submission to release within days, not weeks." },
  { icon: ShieldCheck, title: "Secure Student Records", desc: "Records are encrypted and access-controlled at every stage." },
  { icon: Laptop, title: "Online Request System", desc: "Submit, pay, and track requests from any device, anytime." },
  { icon: UserCheck, title: "Professional Staff", desc: "A trained registrar team dedicated to accurate, courteous service." },
  { icon: BadgeCheck, title: "Verified Documents", desc: "Every release carries a traceable seal and verification code." },
  { icon: Repeat, title: "Reliable Services", desc: "Consistent standards across every academic term, without exception." },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Why Choose Our Office
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            Built around trust and turnaround
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 80} className="p-2">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/15 flex items-center justify-center mb-4">
                <it.icon size={22} color="#D89A0C" strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{it.title}</h3>
              <p className="text-[var(--color-ink-soft)] text-[14.5px] leading-relaxed">{it.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
