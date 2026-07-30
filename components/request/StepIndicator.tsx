"use client";

const STEPS = ["Identification", "Contact", "Document", "Delivery", "Review"];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const active = stepNum === currentStep;
        const done = stepNum < currentStep;
        return (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold border-2 transition-colors ${
                  done
                    ? "bg-[var(--color-royal)] border-[var(--color-royal)] text-white"
                    : active
                    ? "border-[var(--color-royal)] text-[var(--color-royal)] bg-white"
                    : "border-slate-200 text-slate-400 bg-white"
                }`}
              >
                {done ? "✓" : stepNum}
              </div>
              <p
                className={`text-[11px] mt-2 font-medium hidden sm:block ${
                  active || done ? "text-[var(--color-ink)]" : "text-slate-400"
                }`}
              >
                {label}
              </p>
            </div>
            {stepNum < STEPS.length && (
              <div
                className={`h-[2px] flex-1 -mt-5 sm:-mt-6 ${
                  done ? "bg-[var(--color-royal)]" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}