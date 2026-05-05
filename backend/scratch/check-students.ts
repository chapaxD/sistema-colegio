import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
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
    console.log('Students with EXCEL RUDE:', students);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
