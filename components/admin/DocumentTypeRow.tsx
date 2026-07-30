"use client";

import { Pencil, Trash2, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import { type DocumentType } from "@/lib/types";
import { DOCUMENT_ICON_MAP } from "@/lib/icons";

export default function DocumentTypeRow({
  item,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  item: DocumentType;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const Icon = DOCUMENT_ICON_MAP[item.icon] ?? DOCUMENT_ICON_MAP.FileText;

  return (
    <div className="grad-border p-4 sm:p-5 flex items-center gap-4">
      <GripVertical size={16} className="text-ink-soft/40 shrink-0 hidden sm:block" />

      <div className="w-11 h-11 rounded-xl bg-royal/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-royal" strokeWidth={1.8} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-ink truncate">{item.title}</h3>
        <p className="text-[13px] text-ink-soft truncate">{item.description}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label="Move up"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          aria-label="Move down"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronDown size={16} />
        </button>
        <button
          onClick={onEdit}
          aria-label="Edit"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-royal hover:bg-royal/10"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={onDelete}
          aria-label="Delete"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}