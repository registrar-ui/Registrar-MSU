"use client";

import { motion } from "framer-motion";
import { PackageCheck, Truck } from "lucide-react";
import type { DeliveryData } from "@/lib/request-types";
import { TextField } from "../FormFields";

type Props = {
  data: DeliveryData;
  errors: Partial<Record<keyof DeliveryData, string>>;
  onChange: (patch: Partial<DeliveryData>) => void;
};

export default function StepDelivery({ data, errors, onChange }: Props) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-2">
        Delivery Method
      </h3>
      <p className="text-[14px] text-[var(--color-ink-soft)] mb-8">
        Choose how you&apos;d like to receive your document once it&apos;s ready.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          onClick={() => onChange({ method: "pickup" })}
          className={`text-left p-6 rounded-2xl border-2 transition-colors ${
            data.method === "pickup"
              ? "border-[var(--color-royal)] bg-[var(--color-royal)]/5"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--color-royal)]/10 flex items-center justify-center mb-4">
            <PackageCheck size={20} color="#1E3A8A" />
          </div>
          <p className="font-semibold text-[var(--color-ink)] mb-1">Pick-up</p>
          <p className="text-[13px] text-[var(--color-ink-soft)]">
            Claim your document at the Registrar&apos;s Office.
          </p>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          onClick={() => onChange({ method: "courier" })}
          className={`text-left p-6 rounded-2xl border-2 transition-colors ${
            data.method === "courier"
              ? "border-[var(--color-royal)] bg-[var(--color-royal)]/5"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--color-royal)]/10 flex items-center justify-center mb-4">
            <Truck size={20} color="#1E3A8A" />
          </div>
          <p className="font-semibold text-[var(--color-ink)] mb-1">Courier Delivery</p>
          <p className="text-[13px] text-[var(--color-ink-soft)]">
            Have it shipped to your address (fees apply).
          </p>
        </motion.button>
      </div>

      {errors.method && <p className="text-[13px] text-red-600 mb-6 -mt-4">{errors.method}</p>}

      {data.method === "courier" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid sm:grid-cols-2 gap-5"
        >
          <TextField
            label="Receiver Name"
            required
            className="sm:col-span-2"
            value={data.receiverName}
            error={errors.receiverName}
            onChange={(e) => onChange({ receiverName: e.target.value })}
          />
          <TextField
            label="Complete Address"
            required
            className="sm:col-span-2"
            placeholder="House/Unit No., Street, Barangay"
            value={data.address}
            error={errors.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
          <TextField
            label="Province"
            required
            value={data.province}
            error={errors.province}
            onChange={(e) => onChange({ province: e.target.value })}
          />
          <TextField
            label="City / Municipality"
            required
            value={data.cityMunicipality}
            error={errors.cityMunicipality}
            onChange={(e) => onChange({ cityMunicipality: e.target.value })}
          />
          <TextField
            label="ZIP Code"
            required
            value={data.zip}
            error={errors.zip}
            onChange={(e) => onChange({ zip: e.target.value })}
          />
          <TextField
            label="Contact Number"
            required
            type="tel"
            value={data.contactNumber}
            error={errors.contactNumber}
            onChange={(e) => onChange({ contactNumber: e.target.value })}
          />
        </motion.div>
      )}
    </div>
  );
}