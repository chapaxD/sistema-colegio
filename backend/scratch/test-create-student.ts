import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing with DATABASE_URL:', process.env.DATABASE_URL ? 'Defined' : 'Undefined');
    const student = await prisma.student.create({
      data: {
        rude: 'TEST-RUDE-' + Date.now(),
        firstName: 'Test',
        lastName: 'Student',
        schoolId: 1, 
      }
    });
    console.log('Created student:', student);
  } catch (error) {
    console.error('Error detail:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
