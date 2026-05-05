const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    const students = await prisma.student.findMany({
      where: {
        rude: {
          startsWith: 'EXCEL-'
        }
      },
      take: 10
    });
    console.log('Students with EXCEL RUDE:', JSON.stringify(students, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
