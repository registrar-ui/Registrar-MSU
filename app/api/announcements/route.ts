import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/upload";

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(announcements);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const date = formData.get("date") as string | null;
  const category = formData.get("category") as string | null;
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;

  if (!date || !category || !title || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  let imageUrl: string | undefined;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveUploadedImage(imageFile);
  }

  const announcement = await prisma.announcement.create({
    data: {
      date: new Date(date),
      category,
      title,
      description,
      imageUrl,
    },
  });

  return NextResponse.json(announcement, { status: 201 });
}