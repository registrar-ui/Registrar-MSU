"use client";

import { useEffect, useState } from "react";
import { Plus, Megaphone } from "lucide-react";
import {
  type Announcement,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/lib/announcements";
import AnnouncementModal, { type AnnouncementFormValues } from "@/components/admin/AnnouncementModal";
import AnnouncementCard from "@/components/admin/AnnouncementCard";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);

  useEffect(() => {
    setItems(getAnnouncements());
  }, []);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(item: Announcement) {
    setEditing(item);
    setModalOpen(true);
  }

  function handleSave(values: AnnouncementFormValues) {
    if (editing) {
      updateAnnouncement(editing.id, values);
    } else {
      addAnnouncement(values);
    }
    setItems(getAnnouncements());
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (!window.confirm("Delete this announcement? This cannot be undone.")) return;
    deleteAnnouncement(id);
    setItems(getAnnouncements());
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="text-[13px] font-semibold tracking-widest text-gold-deep uppercase mb-1">Announcements</p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Manage Announcements</h1>
          <p className="text-ink-soft text-sm mt-1">
            Stored locally for now — this will save to the database once it's connected.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-gold font-semibold px-5 py-2.5 rounded-full text-[14px] inline-flex items-center gap-2"
        >
          <Plus size={17} /> New Announcement
        </button>
      </div>

      {items.length === 0 ? (
        <div className="grad-border p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-royal/10 flex items-center justify-center mx-auto mb-4">
            <Megaphone size={24} className="text-royal" />
          </div>
          <p className="font-semibold text-ink mb-1">No announcements yet</p>
          <p className="text-[13.5px] text-ink-soft mb-6">Post your first announcement to see it here.</p>
          <button
            onClick={openCreate}
            className="btn-gold font-semibold px-6 py-3 rounded-full text-[14px] inline-flex items-center gap-2"
          >
            <Plus size={16} /> New Announcement
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      <AnnouncementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  );
}