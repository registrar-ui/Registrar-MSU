import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReference } from "@/lib/requestRef";

function deriveStudentName(identification: { method: string; studentNumber?: string; firstName?: string; middleName?: string; lastName?: string }): string {
  if (identification.method === "known") {
    return `Student #${identification.studentNumber}`;
  }
  const parts = [identification.firstName, identification.middleName, identification.lastName].filter(Boolean);
  return parts.join(" ") || "Unknown Student";
}

export async function GET() {
  const requests = await prisma.documentRequest.findMany({
    include: { documentType: { select: { id: true, title: true, icon: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { documentTypeId, identification, contact, document, delivery } = body;

  if (!documentTypeId || !identification || !contact || !document || !delivery) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const documentType = await prisma.documentType.findUnique({ where: { id: documentTypeId } });
  if (!documentType) {
    return NextResponse.json({ error: "Document type not found." }, { status: 404 });
  }

  const studentName = deriveStudentName(identification);

  let created;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      created = await prisma.documentRequest.create({
        data: {
          reference: generateReference(documentType.title),
          documentTypeId,
          studentName,
          studentEmail: contact.email,
          studentMobile: contact.mobile,
          purpose: document.purpose,
          details: { identification, contact, document, delivery },
          status: "PENDING",
        },
      });
      break;
    } catch (err: unknown) {
      const isUniqueViolation =
        typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2002";
      if (isUniqueViolation && attempt < 4) continue;
      throw err;
    }
  }

  return NextResponse.json(created, { status: 201 });
}