import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "PROCESSING", "READY_FOR_RELEASE", "RELEASED", "REJECTED"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const updated = await prisma.documentRequest.update({
    where: { id },
    data: { status },
    include: { documentType: { select: { id: true, title: true, icon: true } } },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.documentRequest.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}