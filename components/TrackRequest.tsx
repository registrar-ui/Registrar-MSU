"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { type DocumentRequest, type RequestStatus } from "@/lib/types";
import { DOCUMENT_ICON_MAP } from "@/lib/icons";

const STATUS_META: Record<RequestStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-slate-100 text-slate-600" },
  PROCESSING: { label: "Processing", className: "bg-gold/15 text-gold-deep" },
  READY_FOR_RELEASE: { label: "Ready for Release", className: "bg-royal/10 text-royal" },
  RELEASED: { label: "Released", className: "bg-emerald-50 text-emerald-600" },
  REJECTED: { label: "Rejected", className: "bg-red-50 text-red-600" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TrackRequest() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DocumentRequest | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const params = new URLSearchParams({ reference: reference.trim(), email: email.trim() });
      const res = await fetch(`/api/requests/track?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No matching request found.");
        setLoading(false);
        return;
      }

      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const Icon = result ? DOCUMENT_ICON_MAP[result.documentType.icon] ?? DOCUMENT_ICON_MAP.FileText : null;
  const meta = result ? STATUS_META[result.status] : null;

  return (
    <section id="track" className="py-24 bg-mist">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <p className="text-[13px] font-semibold tracking-widest text-gold-deep uppercase mb-3">Track Request</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">Check your request status</h2>
          <p className="text-ink-soft mt-4">
            Enter the reference number you received and the email you submitted the request with.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="grad-border p-6 sm:p-7 flex flex-col sm:flex-row gap-3">
            <input
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Reference number (e.g. TR-48213)"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email used in your request"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-gold font-semibold px-6 py-3 rounded-full text-[14.5px] inline-flex items-center justify-center gap-2 disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              {loading ? "Searching…" : "Track"}
            </button>
          </form>
        </Reveal>

        {error && (
          <p className="text-center text-[13.5px] text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mt-6">
            {error}
          </p>
        )}

        <AnimatePresence>
          {result && meta && Icon && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="grad-border p-7 mt-6"
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-royal/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-royal" />
                  </div>
                  <div>
                    <p className="font-mono text-[12.5px] text-ink-soft">{result.reference}</p>
                    <h3 className="font-semibold text-ink">{result.documentType.title}</h3>
                  </div>
                </div>
                <span className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${meta.className}`}>
                  {meta.label}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 mb-4">
                <p className="text-[11px] text-ink-soft font-medium mb-1.5">Remarks from the Registrar</p>
                <p className="text-[14px] text-ink">
                  {result.remarks?.trim() || "No remarks yet — check back later for updates."}
                </p>
              </div>

              <div className="flex items-center justify-between text-[12.5px] text-ink-soft flex-wrap gap-2">
                <span>Submitted {formatDate(result.createdAt)}</span>
                <span>Last updated {formatDate(result.updatedAt)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}