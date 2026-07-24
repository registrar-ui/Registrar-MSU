"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STEP_LABELS } from "@/lib/request-types";

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full">
      {/* mobile: compact "Step X of Y" */}
      <div className="sm:hidden mb-6">
        <p className="text-[13px] font-medium text-[var(--color-ink-soft)]">
          Step {currentStep} of {STEP_LABELS.length} — {STEP_LABELS[currentStep - 1]}
        </p>
        <div className="h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-royal)]"
            initial={false}
            animate={{ width: `${(currentStep / STEP_LABELS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          />
        </div>
      </div>

      {/* desktop: full step row */}
      <div className="hidden sm:flex items-center">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: isDone || isActive ? "#1E3A8A" : "#ffffff",
                    borderColor: isDone || isActive ? "#1E3A8A" : "#CBD5E1",
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-[13px] font-semibold"
                  style={{ color: isDone || isActive ? "#ffffff" : "#64748B" }}
                >
                  {isDone ? <Check size={16} /> : stepNum}
                </motion.div>
                <span
                  className={`text-[12px] font-medium whitespace-nowrap ${
                    isActive ? "text-[var(--color-royal)]" : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {label}
                </span>
              </div>
              {stepNum !== STEP_LABELS.length && (
                <div className="flex-1 h-[2px] mx-3 mb-6 bg-slate-200 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-[var(--color-royal)]"
                    initial={false}
                    animate={{ width: isDone ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
