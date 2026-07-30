"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { type DocumentType } from "@/lib/types";
import { DOCUMENT_ICON_MAP } from "@/lib/icons";

export default function RequestFormPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [docType, setDocType] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [program, setProgram] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    fetch(`/api/document-types/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setDocType)
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentTypeId: params.id,
          studentName,
          studentEmail,
          studentNumber,
          program,
          purpose,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      setReference(data.reference);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-ink-soft text-sm">Loading…</p>
      </main>
    );
  }

  if (!docType) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-ink font-semibold">This document type could not be found.</p>
        <button onClick={() => router.push("/")} className="text-royal font-semibold text-sm">
          ← Back to homepage
        </button>
      </main>
    );
  }

  const Icon = DOCUMENT_ICON_MAP[docType.icon] ?? DOCUMENT_ICON_MAP.FileText;

  if (reference) {
    return (
      <main className="min-h-screen hero-bg flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={30} className="text-emerald-600" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-royal-deep mb-2">Request Submitted</h1>
          <p className="text-ink-soft text-sm mb-6">
            Your request has been received by the registrar's office and is now pending review.
          </p>
          <div className="bg-white rounded-2xl p-4 mb-6">
            <p className="text-[11px] text-ink-soft font-medium mb-1">Reference Number</p>
            <p className="font-mono text-lg font-semibold text-royal">{reference}</p>
          </div>
          <p className="text-[12.5px] text-ink-soft mb-6">
            Save this reference number — you'll need it to follow up on your request.
          </p>
          <a href="/" className="btn-gold font-semibold px-6 py-3 rounded-full text-[14.5px] inline-block">
            Back to Homepage
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mist py-16 px-6">
      <div className="max-w-xl mx-auto">
        <a href="/#services" className="inline-flex items-center gap-1.5 text-royal text-sm font-semibold mb-8">
          <ArrowLeft size={15} /> Back to services
        </a>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-royal/10 flex items-center justify-center shrink-0">
            <Icon size={26} className="text-royal" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">{docType.title}</h1>
            <p className="text-ink-soft text-sm">{docType.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grad-border p-7 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">Full Name</label>
            <input
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
              placeholder="Juan Dela Cruz"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">Student Number</label>
              <input
                required
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                placeholder="2021-00123"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink mb-1.5">Email Address</label>
              <input
                required
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">Program / Course (optional)</label>
            <input
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
              placeholder="BS Marine Biology"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-ink mb-1.5">Purpose</label>
            <textarea
              required
              rows={3}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
              placeholder="e.g. For employment requirements"
            />
          </div>

          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full font-semibold px-6 py-3.5 rounded-full text-[15px] disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Request"}
          </button>
        </form>
      </div>
    </main>
  );
}