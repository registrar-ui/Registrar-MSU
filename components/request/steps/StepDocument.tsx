"use client";

import type { LucideIcon } from "lucide-react";
import type { DocumentRequestData } from "@/lib/request-types";
import { TextAreaField } from "../FormFields";

type Props = {
  data: DocumentRequestData;
  errors: Partial<Record<keyof DocumentRequestData, string>>;
  onChange: (patch: Partial<DocumentRequestData>) => void;
  documentIcon: LucideIcon;
};

export default function StepDocument({ data, errors, onChange, documentIcon: Icon }: Props) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-2">
        Document Request
      </h3>
      <p className="text-[14px] text-[var(--color-ink-soft)] mb-8">
        This request is for the document you selected on the homepage.
      </p>

      <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--color-royal)]/5 border border-[var(--color-royal)]/15 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-royal)] flex items-center justify-center shrink-0">
          <Icon size={22} color="#FBBF24" />
        </div>
        <div>
          <p className="text-[12px] text-[var(--color-ink-soft)] font-medium">Requested Document</p>
          <p className="font-semibold text-[var(--color-ink)]">{data.documentType}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextAreaField
          label="Purpose of Request"
          required
          rows={3}
          placeholder="e.g. Employment requirements, further studies abroad, board exam application..."
          className="sm:col-span-2"
          value={data.purpose}
          error={errors.purpose}
          onChange={(e) => onChange({ purpose: e.target.value })}
        />

        <div>
          <label className="text-[12.5px] font-medium block mb-1.5 text-[var(--color-ink)]">
            Number of Copies <span className="text-[var(--color-gold-deep)]">*</span>
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={data.copies}
            onChange={(e) => onChange({ copies: Math.max(1, Number(e.target.value) || 1) })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-royal)]"
          />
          {errors.copies && <p className="text-[12px] text-red-600 mt-1">{errors.copies}</p>}
        </div>

        <TextAreaField
          label="Special Instructions"
          rows={3}
          placeholder="Optional — anything else the Registrar should know"
          value={data.specialInstructions}
          onChange={(e) => onChange({ specialInstructions: e.target.value })}
        />
      </div>
    </div>
  );
}
