import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const documentTypes = await prisma.documentType.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(documentTypes);
}

export async function POST(req: NextRequest) {
  const { title, description, icon } = await req.json();

  if (!title || !description || !icon) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const last = await prisma.documentType.findFirst({ orderBy: { order: "desc" } });
  const nextOrder = (last?.order ?? -1) + 1;

  const documentType = await prisma.documentType.create({
    data: { title, description, icon, order: nextOrder },
  });

  return NextResponse.json(documentType, { status: 201 });
}