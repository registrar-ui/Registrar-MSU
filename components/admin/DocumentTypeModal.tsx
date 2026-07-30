"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type DocumentType } from "@/lib/types";
import { DOCUMENT_ICON_MAP, DOCUMENT_ICON_KEYS } from "@/lib/icons";

export type DocumentTypeFormValues = {
  title: string;
  description: string;
  icon: string;
};

export default function DocumentTypeModal({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (values: DocumentTypeFormValues) => void;
  initial?: DocumentType | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(DOCUMENT_ICON_KEYS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setIcon(initial?.icon ?? DOCUMENT_ICON_KEYS[0]);
    setErrors({});
  }, [open, initial]);

  function validate() {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Title is required.";
    if (!description.trim()) next.description = "Description is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({ title: title.trim(), description: description.trim(), icon });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-4 py-10 overflow-y-auto"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-royal-deep/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-semibold text-ink">
                {initial ? "Edit Document Type" : "New Document Type"}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-ink-soft"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Transcript of Records"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
                {errors.title && <p className="text-[12px] text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short one-line description shown on the homepage card…"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
                {errors.description && <p className="text-[12px] text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {DOCUMENT_ICON_KEYS.map((key) => {
                    const Icon = DOCUMENT_ICON_MAP[key];
                    const selected = icon === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setIcon(key)}
                        aria-label={key}
                        aria-pressed={selected}
                        className={`aspect-square rounded-xl flex items-center justify-center border-2 transition-colors ${
                          selected
                            ? "border-royal bg-royal/10 text-royal"
                            : "border-slate-200 text-ink-soft hover:border-royal/30"
                        }`}
                      >
                        <Icon size={20} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-gold font-semibold px-6 py-3 rounded-full text-[14.5px] flex-1"
                >
                  {initial ? "Save Changes" : "Add Document Type"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full text-[14.5px] font-semibold text-ink-soft hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}