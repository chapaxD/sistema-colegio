const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { firstName: { contains: 'Dulce', mode: 'insensitive' } },
          { firstName: { contains: 'Elvis', mode: 'insensitive' } }
        ]
      },
      include: {
        school: true,
        enrollments: true
      }
    });
    console.log('Found students:', JSON.stringify(students, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
