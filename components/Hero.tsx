"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

type Particle = {
  id: number;
  size: number;
  left: number;
  bottom: number;
  duration: number;
  delay: number;
};

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        bottom: Math.random() * 40,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 8,
      }))
    );
  }, []);

  return (
    <section
      id="home"
      className="hero-bg relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[var(--color-gold)]"
            style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: `${p.bottom}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -140, opacity: [0, 0.6, 0.5, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* floating shapes */}
      <motion.div
        className="hidden md:block absolute w-24 h-24 rounded-3xl border border-white/15 top-28 left-[6%]"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute w-14 h-14 rounded-full bg-[var(--color-gold)]/20 top-[60%] left-[12%]"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      />
      <motion.div
        className="hidden lg:block absolute w-20 h-20 rounded-2xl bg-white/5 border border-white/10 bottom-16 left-[22%]"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* left */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[var(--color-gold)] bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            Republic of the Philippines · MSU Naawan
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-white text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight"
          >
            Office of the <span className="italic text-[var(--color-gold-soft)]">University Registrar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/75 text-base sm:text-lg mt-6 max-w-xl leading-relaxed"
          >
            Delivering accurate, secure, and student-centered academic records and registrar
            services with efficiency, transparency, and excellence.
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-9"
          >
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#requests"
              className="btn-gold font-semibold px-7 py-3.5 rounded-full text-[15px]"
            >
              Request Documents
            </motion.a>
            <motion.a
              whileHover={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.96 }}
              href="#track"
              className="border-[1.5px] border-white/55 text-white font-semibold px-7 py-3.5 rounded-full text-[15px]"
            >
              Track Request
            </motion.a>
          </motion.div> */}

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-8 mt-12 text-white/70"
          >
            <div>
              <p className="font-display text-2xl text-white font-semibold">12,000+</p>
              <p className="text-xs mt-1">Students Served</p>
            </div>
            <div className="w-px h-9 bg-white/20" />
            <div>
              <p className="font-display text-2xl text-white font-semibold">98%</p>
              <p className="text-xs mt-1">Satisfaction</p>
            </div>
            <div className="w-px h-9 bg-white/20" />
            <div>
              <p className="font-display text-2xl text-white font-semibold">50+</p>
              <p className="text-xs mt-1">Years of Service</p>
            </div>
          </motion.div> */}
        </div>

        {/* right: dashboard mockup + seal */}
     <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative"
        >
          {/* <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-3xl p-5 shadow-2xl max-w-md mx-auto relative z-10"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-display font-semibold text-[var(--color-royal-deep)]">Registrar Dashboard</p>
              <span className="text-[11px] font-mono text-white bg-[var(--color-royal)] px-2.5 py-1 rounded-full">
                LIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-[11px] text-[var(--color-ink-soft)] font-medium">Document Requests</p>
                <p className="font-display text-2xl font-semibold text-[var(--color-royal)] mt-1">248</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-[11px] text-[var(--color-ink-soft)] font-medium">Processing Status</p>
                <p className="font-display text-2xl font-semibold text-[var(--color-gold-deep)] mt-1">On Track</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
              <p className="text-[11px] text-[var(--color-ink-soft)] font-medium mb-2">Student Records</p>
              <div className="flex items-end gap-1.5 h-14">
                {[40, 65, 50, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${i === 4 ? "bg-[var(--color-gold)]" : "bg-[var(--color-royal)]"}`}
                    style={{ height: `${h}%`, opacity: i === 4 ? 1 : 0.2 + i * 0.2 }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[var(--color-ink-soft)] font-medium">Verification</p>
                <p className="font-semibold text-[var(--color-ink)] text-sm mt-0.5">Diploma #TR-08842</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>
          </motion.div> */}

          {/* signature seal */}
          <div className="absolute -bottom-8 -left-8 w-38 h-38 z-20 hidden sm:block drop-shadow-[0_18px_34px_rgba(15,37,87,0.35)]">
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="100" cy="100" r="92" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 7" />
              <path id="sealTextPath" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
              <text fontSize="11" fill="#FDE68A" letterSpacing="2" fontFamily="var(--font-mono)">
                <textPath href="#sealTextPath" startOffset="0%">
                  VERIFIED · AUTHENTICATED · MSU NAAWAN · VERIFIED · AUTHENTICATED ·
                </textPath>
              </text>
            </motion.svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-16 h-16 rounded-full bg-[var(--color-gold)]"
                animate={{ opacity: [0.55, 0.15, 0.55], scale: [1, 1.18, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
           <div className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center">
              <Image
                src="/Logos.png"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
