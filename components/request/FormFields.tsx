"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldWrapperProps = {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function FieldWrapper({ label, required, error, className = "", children }: FieldWrapperProps) {
  return (
    <div className={className}>
      <label className="text-[12.5px] font-medium block mb-1.5 text-[var(--color-ink)]">
        {label}
        {required && <span className="text-[var(--color-gold-deep)]"> *</span>}
      </label>
      {children}
      {error && <p className="text-[12px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}

const baseInput =
  "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-royal)]";

type TextFieldProps = Omit<FieldWrapperProps, "children"> & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, required, error, className, ...props }: TextFieldProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <input
        {...props}
        className={`${baseInput} ${error ? "border-red-400" : "border-slate-200"}`}
      />
    </FieldWrapper>
  );
}

type TextAreaFieldProps = Omit<FieldWrapperProps, "children"> & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, required, error, className, ...props }: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <textarea
        {...props}
        className={`${baseInput} resize-none ${error ? "border-red-400" : "border-slate-200"}`}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = Omit<FieldWrapperProps, "children"> &
  SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder?: string };

export function SelectField({ label, required, error, className, options, placeholder, ...props }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <select
        {...props}
        className={`${baseInput} bg-white ${error ? "border-red-400" : "border-slate-200"}`}
      >
        <option value="" disabled>
          {placeholder ?? "Select..."}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}