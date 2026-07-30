import { type RequestFormData } from "@/lib/request-types";

export type Announcement = {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
export type DocumentType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};
export type RequestStatus = "PENDING" | "PROCESSING" | "READY_FOR_RELEASE" | "RELEASED" | "REJECTED";

export type DocumentRequest = {
  id: string;
  reference: string;
  documentTypeId: string;
  documentType: { id: string; title: string; icon: string };
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  purpose: string;
  details: RequestFormData;
  status: RequestStatus;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};