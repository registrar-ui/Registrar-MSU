"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-mist">
        <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="lg:pl-64">
          <AdminTopbar onMenuClick={() => setMobileOpen(true)} />
          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}