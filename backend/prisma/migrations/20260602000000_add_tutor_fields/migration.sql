-- AlterTable: Agregar campos del Cuadro de Datos del Padre/Madre/Tutor
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "tutorOcupacion"   TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "tutorInstruccion" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "tutorBirthDate"   TIMESTAMP(3);
