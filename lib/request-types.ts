export type IdentificationMethod = "known" | "unknown" | "";

export interface IdentificationData {
  method: IdentificationMethod;
  studentNumber: string;
  lastName: string;
  firstName: string;
  middleName: string;
  college: string;
  program: string;
  yearGraduatedOrLastAttended: string;
  birthDate: string;
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

export type DeliveryMethod = "pickup" | "courier" | "";

export interface DeliveryData {
  method: DeliveryMethod;
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

export function createEmptyFormData(documentTitle: string): RequestFormData {
  return {
    identification: {
      method: "",
      studentNumber: "",
      lastName: "",
      firstName: "",
      middleName: "",
      college: "",
      program: "",
      yearGraduatedOrLastAttended: "",
      birthDate: "",
    },
    contact: {
      email: "",
      mobile: "",
    },
    document: {
      documentType: documentTitle,
      purpose: "",
      copies: 1,
      specialInstructions: "",
    },
    delivery: {
      method: "",
      receiverName: "",
      address: "",
      province: "",
      cityMunicipality: "",
      zip: "",
      contactNumber: "",
    },
  };
}

export const STEP_LABELS = ["Identification", "Contact", "Document", "Delivery", "Review"] as const;