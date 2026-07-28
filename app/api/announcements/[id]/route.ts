import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/upload";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await req.formData();

  const date = formData.get("date") as string | null;
  const category = formData.get("category") as string | null;
  const title = formData.get("title") as string | null;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("removeImage") === "true";

  if (!date || !category || !title || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const data: {
    date: Date;
    category: string;
    title: string;
    description: string;
    imageUrl?: string | null;
  } = {
    date: new Date(date),
    category,
    title,
    description,
  };

  if (imageFile && imageFile.size > 0) {
    data.imageUrl = await saveUploadedImage(imageFile);
  } else if (removeImage) {
    data.imageUrl = null;
  }
  // Otherwise imageUrl is left out of `data` entirely, so the existing value is untouched.

  const announcement = await prisma.announcement.update({
    where: { id },
    data,
  });

  return NextResponse.json(announcement);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.announcement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}