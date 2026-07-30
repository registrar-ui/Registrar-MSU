"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, Copy } from "lucide-react";
import { fetchDocumentType } from "@/lib/documents";
import { DOCUMENT_ICON_MAP } from "@/lib/icons";
import { type DocumentType } from "@/lib/types";
import {
  createEmptyFormData,
  type RequestFormData,
  type IdentificationData,
  type ContactData,
  type DocumentRequestData,
  type DeliveryData,
} from "@/lib/request-types";
import StepIndicator from "./StepIndicator";
import StepIdentification from "./steps/StepIdentification";
import StepContact from "./steps/StepContact";
import StepDocument from "./steps/StepDocument";
import StepDelivery from "./steps/StepDelivery";
import StepReview from "./steps/StepReview";

type Errors = Record<string, string>;

function validateIdentification(d: IdentificationData): Errors {
  const e: Errors = {};
  if (!d.method) {
    e.method = "Please choose one of the options above.";
    return e;
  }
  if (d.method === "known") {
    if (!d.studentNumber.trim()) e.studentNumber = "Student number is required.";
    if (!d.birthDate) e.birthDate = "Birth date is required.";
  } else {
    if (!d.lastName.trim()) e.lastName = "Last name is required.";
    if (!d.firstName.trim()) e.firstName = "First name is required.";
    if (!d.birthDate) e.birthDate = "Birth date is required.";
    if (!d.college.trim()) e.college = "College is required.";
    if (!d.program.trim()) e.program = "Program is required.";
    if (!d.yearGraduatedOrLastAttended.trim()) e.yearGraduatedOrLastAttended = "This field is required.";
  }
  return e;
}

function validateContact(d: ContactData): Errors {
  const e: Errors = {};
  if (!d.email.trim()) e.email = "Email address is required.";
  else if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email address.";
  if (!d.mobile.trim()) e.mobile = "Mobile number is required.";
  return e;
}

function validateDocument(d: DocumentRequestData): Errors {
  const e: Errors = {};
  if (!d.purpose.trim()) e.purpose = "Please tell us the purpose of this request.";
  if (!d.copies || d.copies < 1) e.copies = "Enter at least 1 copy.";
  return e;
}

function validateDelivery(d: DeliveryData): Errors {
  const e: Errors = {};
  if (!d.method) {
    e.method = "Please choose a delivery method.";
    return e;
  }
  if (d.method === "courier") {
    if (!d.receiverName.trim()) e.receiverName = "Receiver name is required.";
    if (!d.address.trim()) e.address = "Complete address is required.";
    if (!d.province.trim()) e.province = "Province is required.";
    if (!d.cityMunicipality.trim()) e.cityMunicipality = "City/Municipality is required.";
    if (!d.zip.trim()) e.zip = "ZIP code is required.";
    if (!d.contactNumber.trim()) e.contactNumber = "Contact number is required.";
  }
  return e;
}

export default function RequestWizard({ slug }: { slug: string }) {
  const [doc, setDoc] = useState<DocumentType | null | undefined>(undefined); // undefined = still loading
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RequestFormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDocumentType(slug).then((result) => {
      setDoc(result);
      if (result) setForm(createEmptyFormData(result.title));
    });
  }, [slug]);

  const patch = {
    identification: (p: Partial<IdentificationData>) =>
      setForm((f) => (f ? { ...f, identification: { ...f.identification, ...p } } : f)),
    contact: (p: Partial<ContactData>) => setForm((f) => (f ? { ...f, contact: { ...f.contact, ...p } } : f)),
    document: (p: Partial<DocumentRequestData>) =>
      setForm((f) => (f ? { ...f, document: { ...f.document, ...p } } : f)),
    delivery: (p: Partial<DeliveryData>) =>
      setForm((f) => (f ? { ...f, delivery: { ...f.delivery, ...p } } : f)),
  };

  function validateCurrentStep(): boolean {
    if (!form) return false;
    let e: Errors = {};
    if (step === 1) e = validateIdentification(form.identification);
    if (step === 2) e = validateContact(form.contact);
    if (step === 3) e = validateDocument(form.document);
    if (step === 4) e = validateDelivery(form.delivery);
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    setDirection(1);
    setErrors({});
    setStep((s) => Math.min(5, s + 1));
  }

  function goBack() {
    setDirection(-1);
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    if (!form || !doc) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, documentTypeId: doc.id }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setReferenceNumber(data.reference);
    } catch {
      setSubmitError("Something went wrong submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  if (doc === undefined) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-6 text-center">
        <p className="text-[var(--color-ink-soft)] text-sm">Loading…</p>
      </div>
    );
  }

  if (doc === null) {
    return (
      <div className="max-w-lg mx-auto py-24 px-6 text-center">
        <p className="font-semibold text-[var(--color-ink)] mb-4">This document type could not be found.</p>
        <Link href="/" className="text-[var(--color-royal)] font-semibold text-sm">
          ← Back to homepage
        </Link>
      </div>
    );
  }

  if (!form) return null;

  const documentIcon = DOCUMENT_ICON_MAP[doc.icon] ?? DOCUMENT_ICON_MAP.FileText;

  if (referenceNumber) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 16 }}
          className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={32} className="text-emerald-600" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-ink)] mb-3">
          Request submitted
        </h2>
        <p className="text-[14.5px] text-[var(--color-ink-soft)] mb-6 leading-relaxed">
          Your request is now <span className="font-semibold text-[var(--color-gold-deep)]">Pending Verification</span>.
          The Registrar will verify your details against the Student Records System and reach
          out through the contact information you provided.
        </p>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="font-mono text-sm px-4 py-2 rounded-full bg-[var(--color-mist)] border border-slate-200">
            {referenceNumber}
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(referenceNumber);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            aria-label="Copy reference number"
          >
            <Copy size={15} />
          </button>
        </div>
        {copied && <p className="text-[12px] text-emerald-600 -mt-6 mb-6">Copied to clipboard</p>}
        <Link
          href="/"
          className="inline-flex items-center gap-2 btn-gold font-semibold px-7 py-3.5 rounded-full text-[15px]"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-14 px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-royal)] mb-8"
      >
        <ArrowLeft size={14} /> Back to homepage
      </Link>

      <div className="mb-10">
        <StepIndicator currentStep={step} />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm min-h-[420px] flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {step === 1 && (
                <StepIdentification data={form.identification} errors={errors} onChange={patch.identification} />
              )}
              {step === 2 && <StepContact data={form.contact} errors={errors} onChange={patch.contact} />}
              {step === 3 && (
                <StepDocument
                  data={form.document}
                  errors={errors}
                  onChange={patch.document}
                  documentIcon={documentIcon}
                />
              )}
              {step === 4 && <StepDelivery data={form.delivery} errors={errors} onChange={patch.delivery} />}
              {step === 5 && <StepReview form={form} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {submitError && <p className="text-[13px] text-red-600 mt-6">{submitError}</p>}

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[14px] font-semibold text-[var(--color-ink-soft)] disabled:opacity-0 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {step < 5 ? (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={goNext}
              className="btn-gold inline-flex items-center gap-1.5 px-7 py-3 rounded-full text-[14px] font-semibold"
            >
              Continue <ArrowRight size={15} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="btn-gold inline-flex items-center gap-2 px-7 py-3 rounded-full text-[14px] font-semibold disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}