import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;

async function test() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const a = await prisma.subjectAssignment.findFirst({
      where: { schoolId: 1 }
    });
    console.log('TS check success', a);
  } catch (e) {
    console.error('TS check failed', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
