-- AlterTable: Agregar campos del Cuadro de Filiación al modelo Student
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "ci"            TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "tutorName"     TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "tutorCi"       TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "tutorRelation" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "address"       TEXT;
