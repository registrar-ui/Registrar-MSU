import Reveal from "./Reveal";
import CountUp from "./CountUp";

const STATS = [
  { target: 12000, suffix: "+", label: "Students Served" },
  { target: 25000, suffix: "+", label: "Documents Processed" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 50, suffix: "+", label: "Years of Service" },
];

export default function Statistics() {
  return (
   <section id="stats" className="py-20 stats-bg relative overflow-hidden">
      <svg className="absolute -right-10 -top-10 w-64 h-64 opacity-10" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="95" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 8" />
      </svg>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center relative">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <p className="font-display text-4xl sm:text-5xl font-semibold text-white">
              <CountUp target={s.target} suffix={s.suffix} />
            </p>
            <p className="text-white/70 text-sm mt-2">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
