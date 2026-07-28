import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(categories.map((c) => c.name));
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const trimmed = (name as string)?.trim();

  if (!trimmed) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }

  await prisma.category.upsert({
    where: { name: trimmed },
    update: {},
    create: { name: trimmed },
  });

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(categories.map((c) => c.name));
}