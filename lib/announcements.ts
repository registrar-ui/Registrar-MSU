"use client";

// Placeholder data layer for Announcements.
// Everything is stored in localStorage for now since there's no database yet.
// When the backend is ready, swap the bodies of these functions for real
// fetch("/api/announcements", ...) calls — the shapes (Announcement, Category)
// and function names can stay exactly the same, so no other file needs to change.

export type Announcement = {
  id: string;
  date: string; // yyyy-mm-dd
  category: string;
  title: string;
  description: string;
  imageDataUrl?: string; // base64 preview; will become a real uploaded file URL later
  createdAt: number;
};

const ANNOUNCEMENTS_KEY = "msu_admin_announcements";
const CATEGORIES_KEY = "msu_admin_categories";
const DEFAULT_CATEGORIES = ["Enrollment", "Examination"];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getAnnouncements(): Announcement[] {
  return read<Announcement[]>(ANNOUNCEMENTS_KEY, []).sort((a, b) => b.createdAt - a.createdAt);
}

export function addAnnouncement(data: Omit<Announcement, "id" | "createdAt">): Announcement {
  const list = read<Announcement[]>(ANNOUNCEMENTS_KEY, []);
  const newItem: Announcement = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  write(ANNOUNCEMENTS_KEY, [newItem, ...list]);
  return newItem;
}

export function updateAnnouncement(id: string, data: Omit<Announcement, "id" | "createdAt">): void {
  const list = read<Announcement[]>(ANNOUNCEMENTS_KEY, []);
  const updated = list.map((item) => (item.id === id ? { ...item, ...data } : item));
  write(ANNOUNCEMENTS_KEY, updated);
}

export function deleteAnnouncement(id: string): void {
  const list = read<Announcement[]>(ANNOUNCEMENTS_KEY, []);
  write(
    ANNOUNCEMENTS_KEY,
    list.filter((item) => item.id !== id)
  );
}

export function getCategories(): string[] {
  const custom = read<string[]>(CATEGORIES_KEY, []);
  return [...DEFAULT_CATEGORIES, ...custom.filter((c) => !DEFAULT_CATEGORIES.includes(c))];
}

export function addCategory(name: string): string[] {
  const trimmed = name.trim();
  const custom = read<string[]>(CATEGORIES_KEY, []);
  if (trimmed && !DEFAULT_CATEGORIES.includes(trimmed) && !custom.includes(trimmed)) {
    write(CATEGORIES_KEY, [...custom, trimmed]);
  }
  return getCategories();
}