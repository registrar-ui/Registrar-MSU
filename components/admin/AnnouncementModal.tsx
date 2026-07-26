"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImagePlus, Plus, Check } from "lucide-react";
import { type Announcement, getCategories, addCategory } from "@/lib/announcements";

export type AnnouncementFormValues = {
  date: string;
  category: string;
  title: string;
  description: string;
  imageDataUrl?: string;
};

export default function AnnouncementModal({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (values: AnnouncementFormValues) => void;
  initial?: Announcement | null;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setCategories(getCategories());
    setDate(initial?.date ?? new Date().toISOString().slice(0, 10));
    setCategory(initial?.category ?? "");
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setImageDataUrl(initial?.imageDataUrl);
    setAddingCategory(false);
    setNewCategory("");
    setErrors({});
  }, [open, initial]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleAddCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    const updated = addCategory(trimmed);
    setCategories(updated);
    setCategory(trimmed);
    setNewCategory("");
    setAddingCategory(false);
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!date) next.date = "Date is required.";
    if (!category) next.category = "Select or add a category.";
    if (!title.trim()) next.title = "Title is required.";
    if (!description.trim()) next.description = "Description is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({ date, category, title: title.trim(), description: description.trim(), imageDataUrl });
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
                {initial ? "Edit Announcement" : "New Announcement"}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-ink-soft"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* date + category */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                  />
                  {errors.date && <p className="text-[12px] text-red-600 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-1.5">Category</label>
                  {!addingCategory ? (
                    <select
                      value={category}
                      onChange={(e) => {
                        if (e.target.value === "__add_new__") {
                          setAddingCategory(true);
                        } else {
                          setCategory(e.target.value);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="__add_new__">+ Add custom category…</option>
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="e.g. Scholarship"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="shrink-0 w-10 h-10 rounded-xl bg-royal text-white flex items-center justify-center"
                        aria-label="Confirm new category"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddingCategory(false);
                          setNewCategory("");
                        }}
                        className="shrink-0 w-10 h-10 rounded-xl bg-slate-100 text-ink-soft flex items-center justify-center"
                        aria-label="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  {errors.category && <p className="text-[12px] text-red-600 mt-1">{errors.category}</p>}
                </div>
              </div>

              {/* title */}
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Second Semester enrollment schedule released"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
                {errors.title && <p className="text-[12px] text-red-600 mt-1">{errors.title}</p>}
              </div>

              {/* description */}
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write the full announcement details…"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
                {errors.description && <p className="text-[12px] text-red-600 mt-1">{errors.description}</p>}
              </div>

              {/* image upload */}
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Image (optional)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imageDataUrl ? (
                  <div className="relative rounded-xl overflow-hidden h-40 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageDataUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageDataUrl(undefined)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-ink-soft hover:border-royal/40 hover:text-royal transition-colors"
                  >
                    <ImagePlus size={22} />
                    <span className="text-[13px] font-medium">Click to upload an image</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-gold font-semibold px-6 py-3 rounded-full text-[14.5px] flex-1"
                >
                  {initial ? "Save Changes" : "Post Announcement"}
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