import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const asgs = await prisma.subjectAssignment.findMany({
    where: {
      subjectId: 6,
      academicYearId: 1
    },
    include: {
      course: true,
      teacher: true
    }
  });
  console.log('Current assignments for subject 6, year 1:', JSON.stringify(asgs, null, 2));
  process.exit(0);
}

check();
