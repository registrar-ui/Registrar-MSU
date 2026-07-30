"use client";

import { useEffect, useState } from "react";
import { Plus, Layers } from "lucide-react";
import { type DocumentType } from "@/lib/types";
import DocumentTypeModal, { type DocumentTypeFormValues } from "@/components/admin/DocumentTypeModal";
import DocumentTypeRow from "@/components/admin/DocumentTypeRow";

export default function AdminDocumentTypesPage() {
  const [items, setItems] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DocumentType | null>(null);

  async function refresh() {
    const res = await fetch("/api/document-types");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item: DocumentType) {
    setEditing(item);
    setModalOpen(true);
  }

  async function handleSave(values: DocumentTypeFormValues) {
    if (editing) {
      await fetch(`/api/document-types/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } else {
      await fetch("/api/document-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    }
    setModalOpen(false);
    await refresh();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this document type from the site?")) return;
    await fetch(`/api/document-types/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const a = items[index];
    const b = items[target];

    // Swap their `order` values on the server, then refresh.
    await Promise.all([
      fetch(`/api/document-types/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: b.order }),
      }),
      fetch(`/api/document-types/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: a.order }),
      }),
    ]);
    await refresh();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="text-[13px] font-semibold tracking-widest text-gold-deep uppercase mb-1">
            Document Types
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
            Manage Offered Documents
          </h1>
          <p className="text-ink-soft text-sm mt-1">
            Controls the "Quick Services" cards on the homepage — add, edit, reorder, or remove.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-gold font-semibold px-5 py-2.5 rounded-full text-[14px] inline-flex items-center gap-2"
        >
          <Plus size={17} /> New Document Type
        </button>
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <div className="grad-border p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-royal/10 flex items-center justify-center mx-auto mb-4">
            <Layers size={24} className="text-royal" />
          </div>
          <p className="font-semibold text-ink mb-1">No document types yet</p>
          <p className="text-[13.5px] text-ink-soft mb-6">
            The homepage services grid will be empty until you add some.
          </p>
          <button
            onClick={openCreate}
            className="btn-gold font-semibold px-6 py-3 rounded-full text-[14px] inline-flex items-center gap-2"
          >
            <Plus size={16} /> New Document Type
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <DocumentTypeRow
              key={item.id}
              item={item}
              isFirst={i === 0}
              isLast={i === items.length - 1}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item.id)}
              onMoveUp={() => handleMove(i, -1)}
              onMoveDown={() => handleMove(i, 1)}
            />
          ))}
        </div>
      )}

      <DocumentTypeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}