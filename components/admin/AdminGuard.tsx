"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  // Avoid flashing protected content before the check resolves.
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist">
        <p className="text-ink-soft text-sm font-medium">Checking session…</p>
      </div>
    );
  }

  return <>{children}</>;
}