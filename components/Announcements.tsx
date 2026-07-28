"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import {
  ScrollText,
  Award,
  LayoutDashboard,
  Megaphone,
  ArrowRight,
  X,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { type Announcement } from "@/lib/types";

// Category -> icon/gradient styling, since these aren't stored in the database.
// Falls back to a generic megaphone + royal gradient for any custom category.
const CATEGORY_STYLES: Record<string, { icon: LucideIcon; from: string; to: string }> = {
  Enrollment: { icon: ScrollText, from: "from-[var(--color-royal)]", to: "to-[var(--color-royal-deep)]" },
  Graduation: { icon: Award, from: "from-[var(--color-royal-mid)]", to: "to-[var(--color-royal)]" },
  Examination: { icon: LayoutDashboard, from: "from-[var(--color-royal-deep)]", to: "to-[var(--color-royal-mid)]" },
};
const DEFAULT_STYLE = { icon: Megaphone, from: "from-[var(--color-royal)]", to: "to-[var(--color-royal-deep)]" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Thumbnail({ post, sizes }: { post: Announcement; sizes: string }) {
  const style = CATEGORY_STYLES[post.category] ?? DEFAULT_STYLE;
  const Icon = style.icon;

  if (post.imageUrl) {
    return (
      <div className="relative w-full h-full">
        <Image src={post.imageUrl} alt={post.title} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${style.from} ${style.to} flex items-center justify-center`}>
      <Icon size={40} color="#FBBF24" strokeWidth={1.6} />
    </div>
  );
}

function AnnouncementCarousel({
  posts,
  onSelect,
}: {
  posts: Announcement[];
  onSelect: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [setWidth, setSetWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Render two identical copies back to back. Once the scroll position has
  // moved exactly one copy's width, we snap it back by that same width —
  // since the copies are identical, the snap is invisible and it *looks*
  // like it just keeps going forever.
  const canLoop = posts.length > 1;
  const items = canLoop ? [...posts, ...posts] : posts;

  useEffect(() => {
    function recalc() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      setSetWidth(canLoop ? trackWidth / 2 : 0);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, canLoop]);

  useAnimationFrame((_, delta) => {
    if (setWidth <= 0) return;

    if (!isDragging && !isHovering) {
      const speed = 26; // px per second — gentle drift
      x.set(x.get() - speed * (delta / 1000));
    }

    // Wrap-around runs every frame (autoplay AND drag) so it loops seamlessly
    // in either direction, no matter how it got near the edge.
    if (x.get() <= -setWidth) {
      x.set(x.get() + setWidth);
    } else if (x.get() > 0) {
      x.set(x.get() - setWidth);
    }
  });

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
    
    >
      <motion.div
        ref={trackRef}
        className="flex gap-8 w-max"
        style={{ x }}
        drag={canLoop ? "x" : false}
        dragElastic={0.02}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {items.map((p, i) => {
          const style = CATEGORY_STYLES[p.category] ?? DEFAULT_STYLE;
          return (
            <motion.div
              key={`${p.id}-${i}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              role="button"
              tabIndex={0}
              aria-label={`Read more: ${p.title}`}
              onClick={() => onSelect(i % posts.length)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(i % posts.length);
                }
              }}
              className={`group grad-border overflow-hidden shrink-0 w-[300px] sm:w-[340px] text-left select-none ${
                canLoop ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
              }`}
            >
              <div className="h-40 relative">
                <Thumbnail post={p} sizes="340px" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[11.5px] text-[var(--color-ink-soft)] font-medium mb-3">
                  <span>{formatDate(p.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-ink-soft)]" />
                  <span className="text-[var(--color-gold-deep)]">{p.category}</span>
                </div>
                <h3 className="font-semibold text-[var(--color-ink)] mb-3 leading-snug">{p.title}</h3>
                <span className="text-sm font-semibold text-[var(--color-royal)] inline-flex items-center gap-1.5">
                  Read More
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Announcements() {
  const [posts, setPosts] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? posts[activeIndex] : null;

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data: Announcement[]) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="announcements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-widest text-[var(--color-gold-deep)] uppercase mb-3">
            Announcements
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink)]">
            Latest from the registrar
          </h2>
          {!loading && posts.length > 1 && (
            <p className="text-[12.5px] text-[var(--color-ink-soft)] mt-3">
            
            </p>
          )}
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {loading ? (
          <p className="text-[var(--color-ink-soft)] text-sm">Loading announcements…</p>
        ) : posts.length === 0 ? (
          <p className="text-[var(--color-ink-soft)] text-sm">No announcements posted yet.</p>
        ) : (
          <AnnouncementCarousel posts={posts} onSelect={setActiveIndex} />
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            onClick={() => setActiveIndex(null)}
          >
            <div className="absolute inset-0 bg-[var(--color-royal-deep)]/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-56 relative">
                <Thumbnail post={active} sizes="512px" />
                <button
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 text-[11.5px] text-[var(--color-ink-soft)] font-medium mb-3">
                  <span>{formatDate(active.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-ink-soft)]" />
                  <span className="text-[var(--color-gold-deep)]">{active.category}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[var(--color-ink)] mb-4 leading-snug">
                  {active.title}
                </h3>
                <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}