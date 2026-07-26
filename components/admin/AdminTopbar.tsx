"use client";

import { Menu, Bell, Search } from "lucide-react";
import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const session = getSession();
    if (session) setEmail(session.email);
  }, []);

  const initials = email ? email.slice(0, 2).toUpperCase() : "AD";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden text-ink" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="relative hidden sm:block max-w-xs w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            placeholder="Search…"
            className="w-full rounded-full border border-slate-200 bg-mist pl-10 pr-4 py-2 text-[13.5px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-ink-soft hover:text-ink" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gold" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-royal text-white flex items-center justify-center text-[12px] font-semibold">
            {initials}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-[13px] font-semibold text-ink truncate max-w-[140px]">
              {email || "Admin"}
            </p>
            <p className="text-[11px] text-ink-soft">Registrar Staff</p>
          </div>
        </div>
      </div>
    </header>
  );
}