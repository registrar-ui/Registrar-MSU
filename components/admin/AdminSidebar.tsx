"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Layers,
  FileText,
  Users,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/document-types", label: "Document Types", icon: Layers },
  { href: "/admin/requests", label: "Document Requests", icon: FileText },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-royal-deep text-white/85 z-50 flex flex-col
        transition-transform duration-300 lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <image href="/Logos.png" x="0" y="0" width="48" height="48" />
            </svg>
            <div className="leading-tight">
              <p className="font-display font-semibold text-white text-sm">MSU Naawan</p>
              <p className="text-[11px] text-white/50">Registrar Admin</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/70" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors
                ${
                  active
                    ? "bg-gold text-royal-deep font-semibold"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-white/75 hover:bg-white/10 hover:text-white w-full transition-colors"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}