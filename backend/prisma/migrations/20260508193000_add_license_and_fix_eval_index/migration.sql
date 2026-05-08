-- AlterTable
ALTER TABLE "School" ADD COLUMN     "licenseExpiry" TIMESTAMP(3),
ADD COLUMN     "licenseStatus" TEXT NOT NULL DEFAULT 'ACTIVE';

-- DropIndex
DROP INDEX "Evaluation_title_subjectId_period_courseId_key";
