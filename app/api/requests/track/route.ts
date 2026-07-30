import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference")?.trim();
  const email = req.nextUrl.searchParams.get("email")?.trim();

  if (!reference || !email) {
    return NextResponse.json({ error: "Reference number and email are required." }, { status: 400 });
  }

  const request = await prisma.documentRequest.findUnique({
    where: { reference: reference.toUpperCase() },
    include: { documentType: { select: { id: true, title: true, icon: true } } },
  });

  // Require the email to match too, so a reference number alone isn't
  // enough for a stranger to pull up someone else's request.
  if (!request || request.studentEmail.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json({ error: "No matching request found. Check your reference number and email." }, { status: 404 });
  }

  return NextResponse.json(request);
}