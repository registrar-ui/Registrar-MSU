/*
  Warnings:

  - You are about to drop the column `program` on the `DocumentRequest` table. All the data in the column will be lost.
  - You are about to drop the column `studentNumber` on the `DocumentRequest` table. All the data in the column will be lost.
  - Added the required column `details` to the `DocumentRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentMobile` to the `DocumentRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DocumentRequest" DROP COLUMN "program",
DROP COLUMN "studentNumber",
ADD COLUMN     "details" JSONB NOT NULL,
ADD COLUMN     "studentMobile" TEXT NOT NULL;
