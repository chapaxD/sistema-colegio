const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();
const SCHOOL_ID = 1; // ID del colegio admin@colegio.com

async function main() {
  console.log(`Iniciando limpieza para School ID: ${SCHOOL_ID}...`);
  try {
    // 1. Notas y asistencias (vinculadas a inscripciones)
    const grades = await prisma.grade.deleteMany({
      where: { enrollment: { schoolId: SCHOOL_ID } }
    });
    console.log(`- Notas eliminadas: ${grades.count}`);

    const attendance = await prisma.attendance.deleteMany({
      where: { enrollment: { schoolId: SCHOOL_ID } }
    });
    console.log(`- Asistencias eliminadas: ${attendance.count}`);

    const dimScores = await prisma.dimensionScore.deleteMany({
      where: { enrollment: { schoolId: SCHOOL_ID } }
    });
    console.log(`- Puntajes de dimensiones eliminados: ${dimScores.count}`);

    const evalScores = await prisma.evaluationScore.deleteMany({
      where: { enrollment: { schoolId: SCHOOL_ID } }
    });
    console.log(`- Puntajes de evaluaciones eliminados: ${evalScores.count}`);

    // 2. Inscripciones
    const enrollments = await prisma.enrollment.deleteMany({
      where: { schoolId: SCHOOL_ID }
    });
    console.log(`- Inscripciones eliminadas: ${enrollments.count}`);

    // 3. Estudiantes
    const students = await prisma.student.deleteMany({
      where: { schoolId: SCHOOL_ID }
    });
    console.log(`- Estudiantes eliminados: ${students.count}`);

    console.log('Limpieza completada con éxito.');
  } catch (error) {
    console.error('Error durante la limpieza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
