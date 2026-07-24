"use client";

// Placeholder auth for the admin area.
// This is intentionally simple (client-side only) so the UI/flow can be built
// and demoed before a real backend / API route / auth provider is wired in.
// Swap `mockLogin` for a real fetch("/api/auth/login", ...) call later —
// everything else (guards, redirects) can stay the same.

const AUTH_KEY = "msu_admin_auth";

export function mockLogin(email: string, password: string): boolean {
  // Demo credentials — replace with a real check against your backend.
  const ok = email.trim().length > 0 && password.length >= 6;
  if (ok && typeof window !== "undefined") {
    window.localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({ email, loggedInAt: Date.now() })
    );
  }
  return ok;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(AUTH_KEY);
}

export function getSession(): { email: string; loggedInAt: number } | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_KEY);
  }
}