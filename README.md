# MSU Naawan — Office of the University Registrar

A Next.js 15 (App Router) rebuild of the registrar landing page, converted from the
static HTML/Tailwind CDN version.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css`)
- Framer Motion for all animation (page-load stagger, scroll reveals, hover/tap
  micro-interactions, the rotating seal, the animated stat counters, the testimonial
  marquee, and the FAQ accordion)
- lucide-react for icons
- next/font for Fraunces (display), Manrope (body), and IBM Plex Mono (data/labels)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Root layout, font loading, metadata
  page.tsx           Assembles all sections
  globals.css        Design tokens (--color-*), Tailwind v4 theme, shared utility classes
components/
  Navbar.tsx
  Hero.tsx
  Services.tsx       "Quick Services" grid
  WhyChoose.tsx
  Timeline.tsx       5-step request process
  Statistics.tsx
  Announcements.tsx
  DownloadCenter.tsx
  Testimonials.tsx
  FAQ.tsx
  Contact.tsx
  Footer.tsx
  Reveal.tsx         Shared scroll-reveal wrapper (Framer Motion whileInView)
  CountUp.tsx         Shared animated counter
```

## Notes

- All content (contact info, stats, announcements, testimonials, forms) is placeholder
  copy carried over from the original HTML — replace with real registrar data before
  deploying.
- The contact form and "Student Portal" / "Track Request" links are UI-only; wire them
  up to your backend or portal auth as needed.
- Colors and fonts are centralized in `app/globals.css`; change the `--color-*` and
  `--font-*` values there to restyle the whole site.
