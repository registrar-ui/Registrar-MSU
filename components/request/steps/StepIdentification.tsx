"use client";

import { motion } from "framer-motion";
import { IdCard, UserRoundSearch } from "lucide-react";
import type { IdentificationData } from "@/lib/request-types";
import { TextField } from "../FormFields";

type Props = {
  data: IdentificationData;
  errors: Partial<Record<keyof IdentificationData, string>>;
  onChange: (patch: Partial<IdentificationData>) => void;
};

export default function StepIdentification({ data, errors, onChange }: Props) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-2">
        Student Identification
      </h3>
      <p className="text-[14px] text-[var(--color-ink-soft)] mb-8">
        Can you provide your Student Number? These details help the Registrar locate your
        file in the university&apos;s Student Records System — they are not verified here.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          onClick={() => onChange({ method: "known" })}
          className={`text-left p-6 rounded-2xl border-2 transition-colors ${
            data.method === "known"
              ? "border-[var(--color-royal)] bg-[var(--color-royal)]/5"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--color-royal)]/10 flex items-center justify-center mb-4">
            <IdCard size={20} color="#1E3A8A" />
          </div>
          <p className="font-semibold text-[var(--color-ink)] mb-1">I have my Student Number</p>
          <p className="text-[13px] text-[var(--color-ink-soft)]">
            Fastest option — just your student number and birth date.
          </p>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          onClick={() => onChange({ method: "unknown" })}
          className={`text-left p-6 rounded-2xl border-2 transition-colors ${
            data.method === "unknown"
              ? "border-[var(--color-royal)] bg-[var(--color-royal)]/5"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--color-royal)]/10 flex items-center justify-center mb-4">
            <UserRoundSearch size={20} color="#1E3A8A" />
          </div>
          <p className="font-semibold text-[var(--color-ink)] mb-1">I do not have my Student Number</p>
          <p className="text-[13px] text-[var(--color-ink-soft)]">
            We&apos;ll ask a few extra details instead.
          </p>
        </motion.button>
      </div>

      {errors.method && <p className="text-[13px] text-red-600 mb-6 -mt-4">{errors.method}</p>}

      {data.method === "known" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid sm:grid-cols-2 gap-5"
        >
          <TextField
            label="Student Number"
            required
            placeholder="e.g. 2021-00123"
            value={data.studentNumber}
            error={errors.studentNumber}
            onChange={(e) => onChange({ studentNumber: e.target.value })}
          />
          <TextField
            label="Birth Date"
            required
            type="date"
            value={data.birthDate}
            error={errors.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
          />
        </motion.div>
      )}

      {data.method === "unknown" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid sm:grid-cols-2 gap-5"
        >
          <TextField
            label="Last Name"
            required
            value={data.lastName}
            error={errors.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
          <TextField
            label="First Name"
            required
            value={data.firstName}
            error={errors.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
          <TextField
            label="Middle Name"
            value={data.middleName}
            onChange={(e) => onChange({ middleName: e.target.value })}
          />
          <TextField
            label="Birth Date"
            required
            type="date"
            value={data.birthDate}
            error={errors.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
          />
          <TextField
            label="College"
            required
            placeholder="e.g. College of Fisheries"
            value={data.college}
            error={errors.college}
            onChange={(e) => onChange({ college: e.target.value })}
          />
          <TextField
            label="Program"
            required
            placeholder="e.g. BS Marine Biology"
            value={data.program}
            error={errors.program}
            onChange={(e) => onChange({ program: e.target.value })}
          />
          <TextField
            label="Year Graduated / Last Year Attended"
            required
            placeholder="e.g. 2023"
            className="sm:col-span-2"
            value={data.yearGraduatedOrLastAttended}
            error={errors.yearGraduatedOrLastAttended}
            onChange={(e) => onChange({ yearGraduatedOrLastAttended: e.target.value })}
          />
        </motion.div>
      )}
    </div>
  );
}