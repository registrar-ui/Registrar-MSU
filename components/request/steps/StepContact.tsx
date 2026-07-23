"use client";

import type { ContactData } from "@/lib/request-types";
import { TextField } from "../FormFields";

type Props = {
  data: ContactData;
  errors: Partial<Record<keyof ContactData, string>>;
  onChange: (patch: Partial<ContactData>) => void;
};

export default function StepContact({ data, errors, onChange }: Props) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-2">
        Contact Information
      </h3>
      <p className="text-[14px] text-[var(--color-ink-soft)] mb-8">
        We&apos;ll use these to send status updates about your request.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField
          label="Email Address"
          required
          type="email"
          placeholder="you@example.com"
          value={data.email}
          error={errors.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <TextField
          label="Mobile Number"
          required
          type="tel"
          placeholder="09XX XXX XXXX"
          value={data.mobile}
          error={errors.mobile}
          onChange={(e) => onChange({ mobile: e.target.value })}
        />
      </div>
    </div>
  );
}