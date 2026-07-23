export type IdentificationMethod = "known" | "unknown";

export type DeliveryMethod = "pickup" | "courier";

export interface IdentificationData {
  method: IdentificationMethod | null;
  // Option A — has student number
  studentNumber: string;
  // Shared by both options
  birthDate: string;
  // Option B — no student number
  lastName: string;
  firstName: string;
  middleName: string;
  college: string;
  program: string;
  yearGraduatedOrLastAttended: string;
}

export interface ContactData {
  email: string;
  mobile: string;
}

export interface DocumentRequestData {
  documentType: string;
  purpose: string;
  copies: number;
  specialInstructions: string;
}

export interface DeliveryData {
  method: DeliveryMethod | null;
  receiverName: string;
  address: string;
  province: string;
  cityMunicipality: string;
  zip: string;
  contactNumber: string;
}

export interface RequestFormData {
  identification: IdentificationData;
  contact: ContactData;
  document: DocumentRequestData;
  delivery: DeliveryData;
}

export const createEmptyFormData = (documentType: string): RequestFormData => ({
  identification: {
    method: null,
    studentNumber: "",
    birthDate: "",
    lastName: "",
    firstName: "",
    middleName: "",
    college: "",
    program: "",
    yearGraduatedOrLastAttended: "",
  },
  contact: {
    email: "",
    mobile: "",
  },
  document: {
    documentType,
    purpose: "",
    copies: 1,
    specialInstructions: "",
  },
  delivery: {
    method: null,
    receiverName: "",
    address: "",
    province: "",
    cityMunicipality: "",
    zip: "",
    contactNumber: "",
  },
});

export const STEP_LABELS = ["Identification", "Contact", "Document", "Delivery", "Review"] as const;