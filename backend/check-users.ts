import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const users = await prisma.user.findMany();
  console.log('Usuarios en la DB:', users.length);
  users.forEach(u => console.log(`- ${u.email} (${u.role})`));
  
  await prisma.$disconnect();
  await pool.end();
}

main();
