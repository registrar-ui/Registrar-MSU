-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'PROCESSING', 'READY_FOR_RELEASE', 'RELEASED', 'REJECTED');

-- CreateTable
CREATE TABLE "DocumentRequest" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "documentTypeId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "studentNumber" TEXT NOT NULL,
    "program" TEXT,
    "purpose" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentRequest_reference_key" ON "DocumentRequest"("reference");

-- AddForeignKey
ALTER TABLE "DocumentRequest" ADD CONSTRAINT "DocumentRequest_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
