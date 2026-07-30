import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/upload";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status, remarks } = await req.json();

  const data: { status?: string; remarks?: string | null } = {};

  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    data.status = status;
  }

  if (remarks !== undefined) {
    data.remarks = remarks === "" ? null : remarks;
  }

  const updated = await prisma.documentRequest.update({
    where: { id },
    data,
    include: { documentType: { select: { id: true, title: true, icon: true } } },
  });
  return NextResponse.json(updated);
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