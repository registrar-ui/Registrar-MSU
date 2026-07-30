import { type DocumentType } from "@/lib/types";

export async function fetchDocumentType(id: string): Promise<DocumentType | null> {
  const res = await fetch(`/api/document-types/${id}`);
  if (!res.ok) return null;
  return res.json();
}