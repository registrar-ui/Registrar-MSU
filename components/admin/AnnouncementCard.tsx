"use client";

import { Pencil, Trash2, ImageOff } from "lucide-react";
import { type Announcement } from "@/lib/types";

export default function AnnouncementCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Announcement;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="grad-border overflow-hidden">
      <div className="h-36 bg-mist flex items-center justify-center">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <ImageOff size={26} className="text-ink-soft/40" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-[11.5px] text-ink-soft font-medium mb-2.5">
         <span>{item.date.slice(0, 10)}</span>
          <span className="w-1 h-1 rounded-full bg-ink-soft" />
          <span className="text-gold-deep">{item.category}</span>
        </div>
        <h3 className="font-semibold text-ink mb-1.5 leading-snug">{item.title}</h3>
        <p className="text-[13px] text-ink-soft leading-relaxed line-clamp-2 mb-4">{item.description}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-royal border border-royal/20 rounded-full py-2 hover:bg-royal/5 transition-colors"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-red-600 border border-red-200 rounded-full py-2 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}