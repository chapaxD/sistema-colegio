import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

// Configuración de URLs
const LOCAL_URL = "postgresql://postgres:mario251985@localhost:5432/colegios?schema=public";
const REMOTE_URL = process.env.DATABASE_URL; // La de Neon que ya tienes en el .env

if (!REMOTE_URL || REMOTE_URL.includes('localhost')) {
  console.error("❌ ERROR: La URL en el .env sigue siendo localhost. Por favor, pon la de Neon en el .env para migrar.");
  process.exit(1);
}

// Primero configuramos la URL local para el primer cliente
process.env.DATABASE_URL = LOCAL_URL;
const localPrisma = new PrismaClient();

// Luego configuramos la URL remota para el segundo cliente
// Nota: Guardamos la remota en otra variable para que el script pueda usarla
const remotePrisma = new PrismaClient({
  datasources: { db: { url: REMOTE_URL } },
} as any);

async function migrate() {
  console.log("🚀 Iniciando migración de datos de Local a Neon...");

  try {
    // 1. Schools
    const schools = await localPrisma.school.findMany();
    console.log(`📦 Migrando ${schools.length} colegios...`);
    for (const item of schools) {
      await remotePrisma.school.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 2. Users
    const users = await localPrisma.user.findMany();
    console.log(`📦 Migrando ${users.length} usuarios...`);
    for (const item of users) {
      await remotePrisma.user.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 3. Teachers
    const teachers = await localPrisma.teacher.findMany();
    console.log(`📦 Migrando ${teachers.length} profesores...`);
    for (const item of teachers) {
      await remotePrisma.teacher.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 4. AcademicYears
    const years = await localPrisma.academicYear.findMany();
    console.log(`📦 Migrando ${years.length} años académicos...`);
    for (const item of years) {
      await remotePrisma.academicYear.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 5. Courses
    const courses = await localPrisma.course.findMany();
    console.log(`📦 Migrando ${courses.length} cursos...`);
    for (const item of courses) {
      await remotePrisma.course.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 6. Subjects
    const subjects = await localPrisma.subject.findMany();
    console.log(`📦 Migrando ${subjects.length} materias...`);
    for (const item of subjects) {
      await remotePrisma.subject.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 7. Students
    const students = await localPrisma.student.findMany();
    console.log(`📦 Migrando ${students.length} alumnos...`);
    for (const item of students) {
      await remotePrisma.student.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 8. Enrollments
    const enrollments = await localPrisma.enrollment.findMany();
    console.log(`📦 Migrando ${enrollments.length} inscripciones...`);
    for (const item of enrollments) {
      await remotePrisma.enrollment.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 9. SubjectAssignments
    const assignments = await localPrisma.subjectAssignment.findMany();
    console.log(`📦 Migrando ${assignments.length} asignaciones...`);
    for (const item of assignments) {
      await remotePrisma.subjectAssignment.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 10. Evaluations
    const evaluations = await localPrisma.evaluation.findMany();
    console.log(`📦 Migrando ${evaluations.length} evaluaciones...`);
    for (const item of evaluations) {
      await remotePrisma.evaluation.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 11. EvaluationScores
    const scores = await localPrisma.evaluationScore.findMany();
    console.log(`📦 Migrando ${scores.length} notas de evaluación...`);
    for (const item of scores) {
      await remotePrisma.evaluationScore.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 12. Grades (Finales)
    const grades = await localPrisma.grade.findMany();
    console.log(`📦 Migrando ${grades.length} calificaciones finales...`);
    for (const item of grades) {
      await remotePrisma.grade.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 13. Attendance
    const attendances = await localPrisma.attendance.findMany();
    console.log(`📦 Migrando ${attendances.length} registros de asistencia...`);
    for (const item of attendances) {
      await remotePrisma.attendance.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    // 14. DimensionScores
    const dimScores = await localPrisma.dimensionScore.findMany();
    console.log(`📦 Migrando ${dimScores.length} puntajes de dimensiones...`);
    for (const item of dimScores) {
      await remotePrisma.dimensionScore.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }

    console.log("✅ ¡MIGRACIÓN COMPLETADA CON ÉXITO!");
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  } finally {
    await localPrisma.$disconnect();
    await remotePrisma.$disconnect();
  }
}

migrate();
