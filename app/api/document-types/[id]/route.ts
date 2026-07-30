import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const data: { title?: string; description?: string; icon?: string; order?: number } = {};
  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.description === "string") data.description = body.description;
  if (typeof body.icon === "string") data.icon = body.icon;
  if (typeof body.order === "number") data.order = body.order;

  const documentType = await prisma.documentType.update({ where: { id }, data });
  return NextResponse.json(documentType);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.documentType.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}