import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@msunaawan.edu.ph";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, passwordHash, name: "Registrar Admin" },
    });
    console.log(`✔ Created admin user: ${email} / ${password}`);
  } else {
    console.log(`ℹ Admin user already exists: ${email}`);
  }

  const defaultCategories = ["Enrollment", "Examination"];
  for (const name of defaultCategories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("✔ Default categories ready:", defaultCategories.join(", "));

  const existingDocTypes = await prisma.documentType.count();
  if (existingDocTypes === 0) {
    await prisma.documentType.createMany({
      data: [
        { title: "Transcript of Records", description: "Official, sealed copies of your complete academic record.", icon: "FileText", order: 0 },
        { title: "Certificate of Enrollment", description: "Proof of current enrollment for scholarships and employment.", icon: "BadgeCheck", order: 1 },
        { title: "Diploma", description: "Replacement and certified true copies of your diploma.", icon: "Award", order: 2 },
        { title: "Authentication", description: "CHED / DFA red-ribbon authentication assistance.", icon: "ShieldCheck", order: 3 },
        { title: "Graduation", description: "Application for graduation and clearance processing.", icon: "GraduationCap", order: 4 },
        { title: "Student Records", description: "Access and correction requests for your academic file.", icon: "FolderOpen", order: 5 },
        { title: "Good Moral", description: "Certificate of good moral character for transfer or work.", icon: "Heart", order: 6 },
        { title: "Certifications", description: "General certifications for units earned, honors, and more.", icon: "Stamp", order: 7 },
      ],
    });
    console.log("✔ Default document types seeded");
  } else {
    console.log("ℹ Document types already exist, skipping default seed");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });