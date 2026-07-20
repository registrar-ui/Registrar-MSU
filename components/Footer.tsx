import { Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-royal-deep)] text-white/80 pt-16 pb-8 relative overflow-hidden">
      <svg className="absolute -left-16 -bottom-16 w-72 h-72 opacity-[0.06]" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="95" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 8" />
      </svg>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
              <image
                  href="/Logos.png"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                />
            </svg>
            <span className="font-display font-semibold text-white">MSU Naawan</span>
          </div>
          <p className="text-sm leading-relaxed">
            Office of the University Registrar, Mindanao State University at Naawan.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-4 text-sm">Quick Links</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#home" className="hover:text-[var(--color-gold)]">Home</a></li>
            <li><a href="#about" className="hover:text-[var(--color-gold)]">About</a></li>
            <li><a href="#announcements" className="hover:text-[var(--color-gold)]">Announcements</a></li>
            <li><a href="#faqs" className="hover:text-[var(--color-gold)]">FAQs</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-4 text-sm">Services</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#services" className="hover:text-[var(--color-gold)]">Transcript of Records</a></li>
            <li><a href="#services" className="hover:text-[var(--color-gold)]">Certificate of Enrollment</a></li>
            <li><a href="#services" className="hover:text-[var(--color-gold)]">Diploma</a></li>
            <li><a href="#downloads" className="hover:text-[var(--color-gold)]">Download Forms</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-4 text-sm">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li>Naawan, Misamis Oriental, PH</li>
            <li>(088) 555-0192</li>
            <li>registrar@msunaawan.edu.ph</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-royal-deep)] transition-colors"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 pt-6 border-t border-white/10 text-xs text-white/50 text-center">
        © 2026 Office of the University Registrar, Mindanao State University at Naawan. All rights reserved.
      </div>
    </footer>
  );
}
