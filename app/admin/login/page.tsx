"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { mockLogin } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulated network delay for now — replace with a real API call later.
    setTimeout(() => {
      const ok = mockLogin(email, password);
      setLoading(false);
      if (ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid email or password. Password must be at least 6 characters.");
      }
    }, 500);
  }

  return (
    <main className="relative min-h-screen hero-bg flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* decorative seal ring, echoes the public site's signature element */}
      <svg
        className="absolute -right-24 -bottom-24 w-96 h-96 opacity-10 animate-spin-slow"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="95" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 8" />
      </svg>
      <div className="hidden md:block animate-float-y absolute w-24 h-24 rounded-3xl border border-white/10 top-24 left-[8%]" />
      <div
        className="hidden md:block animate-float-y absolute w-14 h-14 rounded-full bg-gold/15 bottom-28 left-[14%]"
        style={{ animationDelay: "1.4s" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* brand mark */}
        <div className="flex flex-col items-center mb-8">
          <svg width="95" height="95" viewBox="0 0 48 48" fill="none" className="mb-4">
         <image
                  href="/Logos.png"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                />
          </svg>
          <p className="text-white/60 text-[12px] font-semibold tracking-widest uppercase">MSU Naawan</p>
          <h1 className="font-display text-white text-2xl font-semibold mt-1 text-center">
            Registrar Admin Portal
          </h1>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-royal-deep mb-6">
            <ShieldCheck size={16} className="text-gold-deep" />
            Staff and administrator access only
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-ink mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@msunaawan.edu.ph"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-semibold text-ink mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 py-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-ink-soft select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300"
                />
                Keep me signed in
              </label>
              <a href="#" className="font-semibold text-royal hover:text-royal-deep">
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="ripple btn-gold w-full font-semibold px-6 py-3.5 rounded-full text-[15px] inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-[12.5px] mt-6">
          Having trouble signing in? Contact the IT officer at{" "}
          <a href="mailto:tibong@msunaawan.edu.ph" className="text-white/80 underline">
            tibongthegreat@msunaawan.edu.ph
          </a>
        </p>
      </motion.div>
    </main>
  );
}