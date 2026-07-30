"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { type DocumentType } from "@/lib/types";
import { DOCUMENT_ICON_MAP } from "@/lib/icons";


export default function Services() {
  const [items, setItems] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/document-types")
      .then((res) => res.json())
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-24 bg-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[13px] font-semibold tracking-widest text-gold-deep uppercase mb-3">Quick Services</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
            Everything you need, one request away
          </h2>
          <p className="text-ink-soft mt-4">
            Click a document below to start your online request — no queueing, no guesswork, just a clear path
            from submission to release.
          </p>
        </Reveal>

        <div id="about">
          {loading ? (
            <p className="text-center text-ink-soft text-sm">Loading services…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-ink-soft text-sm">No document types have been added yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((s, i) => {
                const Icon = DOCUMENT_ICON_MAP[s.icon] ?? DOCUMENT_ICON_MAP.FileText;
              return (
                  <Reveal key={s.id} delay={(i % 4) * 0.08}>
                    <Link
                      href={`/request/${s.id}`}
                      className="grad-border p-6 h-full block hover:-translate-y-2 transition-transform duration-300"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-royal/10 flex items-center justify-center mb-5">
                        <Icon size={22} className="text-royal" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-semibold text-ink mb-1.5">{s.title}</h3>
                      <p className="text-[13.5px] text-ink-soft leading-relaxed">{s.description}</p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}