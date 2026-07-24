"use client";

import { User, Mail, FileText, Truck } from "lucide-react";
import type { RequestFormData } from "@/lib/request-types";

function SummaryCard({
  icon: Icon,
  title,
  rows,
}: {
  icon: typeof User;
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-royal)]/10 flex items-center justify-center">
          <Icon size={15} color="#1E3A8A" />
        </div>
        <p className="font-semibold text-[14px] text-[var(--color-ink)]">{title}</p>
      </div>
      <dl className="space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 text-[13px]">
            <dt className="text-[var(--color-ink-soft)]">{r.label}</dt>
            <dd className="text-[var(--color-ink)] font-medium text-right">{r.value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function StepReview({ form }: { form: RequestFormData }) {
  const { identification: idf, contact, document, delivery } = form;

  const identificationRows =
    idf.method === "known"
      ? [
          { label: "Student Number", value: idf.studentNumber },
          { label: "Birth Date", value: idf.birthDate },
        ]
      : [
          { label: "Name", value: `${idf.firstName} ${idf.middleName} ${idf.lastName}`.replace(/\s+/g, " ").trim() },
          { label: "Birth Date", value: idf.birthDate },
          { label: "College", value: idf.college },
          { label: "Program", value: idf.program },
          { label: "Year Graduated / Last Attended", value: idf.yearGraduatedOrLastAttended },
        ];

  const deliveryRows =
    delivery.method === "courier"
      ? [
          { label: "Method", value: "Courier Delivery" },
          { label: "Receiver", value: delivery.receiverName },
          { label: "Address", value: delivery.address },
          { label: "Province", value: delivery.province },
          { label: "City / Municipality", value: delivery.cityMunicipality },
          { label: "ZIP Code", value: delivery.zip },
          { label: "Contact Number", value: delivery.contactNumber },
        ]
      : [{ label: "Method", value: "Pick-up at Registrar's Office" }];

  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-2">
        Review &amp; Submit
      </h3>
      <p className="text-[14px] text-[var(--color-ink-soft)] mb-8">
        Please check everything below before submitting. You can go back to any step to make
        changes.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        <SummaryCard icon={User} title="Student Identification" rows={identificationRows} />
        <SummaryCard
          icon={Mail}
          title="Contact Information"
          rows={[
            { label: "Email", value: contact.email },
            { label: "Mobile", value: contact.mobile },
          ]}
        />
        <SummaryCard
          icon={FileText}
          title="Requested Document"
          rows={[
            { label: "Document", value: document.documentType },
            { label: "Purpose", value: document.purpose },
            { label: "Copies", value: String(document.copies) },
            { label: "Special Instructions", value: document.specialInstructions || "None" },
          ]}
        />
        <SummaryCard icon={Truck} title="Delivery Details" rows={deliveryRows} />
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[13px] text-[var(--color-ink-soft)]">
        Submitting sets this request to <span className="font-semibold text-[var(--color-gold-deep)]">Pending Verification</span>.
        The Registrar will verify your identity and academic record using the university&apos;s
        Student Records System before processing.
      </div>
    </div>
  );
}
