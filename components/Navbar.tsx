"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const LINKS = [
  { label: "Home", href: "#home" },
  // { label: "About", href: "#about" },
  // { label: "Services", href: "#services" },
  // { label: "Online Requests", href: "#requests" },
  // { label: "Download Forms", href: "#downloads" },
  { label: "Announcements", href: "#announcements" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-400"
      style={{
        backgroundColor: solid ? "var(--color-royal)" : "transparent",
        boxShadow: solid ? "0 8px 30px -12px rgba(15,37,87,.45)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        <a href="#home" className="flex items-center gap-3">
          <svg width="50" height="50" viewBox="0 0 48 48" fill="none">
              <image
                  href="/Logos.png"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                />
          </svg>
          <span className="font-display text-white font-semibold leading-tight text-sm md:text-base">
            MSU Naawan
            <br className="hidden sm:block" />
            <span className="text-[11px] md:text-xs font-normal font-sans opacity-80 tracking-wide">
              Office of the University Registrar
            </span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-white/90 text-[14.5px] font-medium">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="relative group">
              {l.label}
              <span className="absolute left-0 -bottom-1.5 w-0 h-[2px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
{/*
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="btn-gold hidden sm:inline-flex font-semibold text-sm px-5 py-2.5 rounded-full transition-transform hover:-translate-y-0.5"
          >
            Student Portal
          </a>
          <button
            className="lg:hidden text-white p-2"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        */}
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[var(--color-royal-deep)]"
          >
            <div className="px-6 pb-6 pt-2 flex flex-col gap-4 text-white/90 text-sm font-medium">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              
               <a href="#" className="btn-gold font-semibold text-center px-5 py-2.5 rounded-full w-fit">
                  Student Portal
                </a>
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>   
    </motion.header>
  );
}
