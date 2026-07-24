import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOCUMENTS, getDocumentBySlug } from "@/lib/documents";
import RequestWizard from "@/components/request/RequestWizard";

type PageParams = { slug: string };

export function generateStaticParams() {
  return DOCUMENTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  return {
    title: doc ? `Request ${doc.title} — MSU Naawan Registrar` : "Request Document — MSU Naawan Registrar",
  };
}

export default async function RequestPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-mist)]">
      <div className="hero-bg py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[12px] tracking-widest font-semibold text-[var(--color-gold)] uppercase mb-2">
            Online Student Request
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Request: {doc.title}
          </h1>
        </div>
      </div>
      <RequestWizard slug={slug} />
    </main>
  );
}
