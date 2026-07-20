"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import Reveal from "./Reveal";

const DETAILS = [
  { icon: MapPin, label: "Address", value: "MSU Naawan Campus, Naawan, Misamis Oriental, Philippines" },
  { icon: Phone, label: "Phone", value: "(088) 555-0192" },
  { icon: Mail, label: "Email", value: "registrar@msunaawan.edu.ph" },
  { icon: Clock, label: "Office Hours", value: "Monday–Friday, 8:00 AM–5:00 PM" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            We&apos;re here to help
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-14">
          <Reveal>
            <div className="space-y-6">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-royal)]/10 flex items-center justify-center shrink-0">
                    <d.icon size={20} color="#1E3A8A" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{d.label}</p>
                    <p className="text-[14.5px] text-[var(--color-ink-soft)]">{d.value}</p>
                  </div>
                </div>
              ))}
              <a href="#" className="inline-flex items-center gap-2 text-[var(--color-royal)] font-semibold text-sm mt-2">
                <Facebook size={18} fill="#1E3A8A" color="#1E3A8A" />
                Facebook Page
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="grad-border p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
                <input required type="email" placeholder="Email address" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <input type="text" placeholder="Subject" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              <textarea required rows={4} placeholder="Message" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="btn-gold font-semibold px-7 py-3.5 rounded-full text-[15px] w-full sm:w-auto"
              >
                Send Message
              </motion.button>
              {sent && (
                <p className="text-emerald-700 text-sm font-medium">
                  Message sent — the registrar office will respond shortly.
                </p>
              )}
            </form>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-14 rounded-3xl overflow-hidden border border-slate-100 h-72">
          <iframe
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=MSU+Naawan,+Naawan,+Misamis+Oriental&output=embed"
            title="MSU Naawan Campus Map"
          />
        </Reveal>
      </div>
    </section>
  );
}
