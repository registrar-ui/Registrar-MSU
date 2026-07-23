import {
  FileText,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
  Award,
  FolderOpen,
  BadgeCheck,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export type DocumentInfo = {
  slug: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

/**
 * Single source of truth for the documents students can request.
 * Used by the homepage Quick Services grid (components/Services.tsx) and by
 * the dynamic request wizard route (app/request/[slug]/page.tsx) so the two
 * always stay in sync.
 */
export const DOCUMENTS: DocumentInfo[] = [
  {
    slug: "transcript-of-records",
    title: "Transcript of Records",
    desc: "Official, sealed copies of your complete academic record.",
    icon: FileText,
  },
  {
    slug: "certificate-of-enrollment",
    title: "Certificate of Enrollment",
    desc: "Proof of current enrollment for scholarships and employment.",
    icon: ClipboardCheck,
  },
  {
    slug: "diploma",
    title: "Diploma",
    desc: "Replacement and certified true copies of your diploma.",
    icon: GraduationCap,
  },
  {
    slug: "authentication",
    title: "Authentication",
    desc: "CHED / DFA red-ribbon authentication assistance.",
    icon: ShieldCheck,
  },
  {
    slug: "graduation",
    title: "Graduation",
    desc: "Application for graduation and clearance processing.",
    icon: Award,
  },
  {
    slug: "student-records",
    title: "Student Records",
    desc: "Access and correction requests for your academic file.",
    icon: FolderOpen,
  },
  {
    slug: "good-moral",
    title: "Good Moral",
    desc: "Certificate of good moral character for transfer or work.",
    icon: BadgeCheck,
  },
  {
    slug: "certifications",
    title: "Certifications",
    desc: "General certifications for units earned, honors, and more.",
    icon: ScrollText,
  },
];

export function getDocumentBySlug(slug: string): DocumentInfo | undefined {
  return DOCUMENTS.find((d) => d.slug === slug);
}