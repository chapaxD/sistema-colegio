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
          { firstName: { contains: 'Elvis', mode: 'insensitive' } },
          { lastName: { contains: 'Perez', mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    console.log('Found students (last 20):');
    students.slice(0, 20).forEach(s => {
      console.log(`ID: ${s.id}, RUDE: ${s.rude}, Name: ${s.firstName} ${s.lastName}, SchoolId: ${s.schoolId}, Active: ${s.isActive}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
