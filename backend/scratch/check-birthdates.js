const { PrismaClient } = require('../node_modules/@prisma/client');
const p = new PrismaClient();

async function main() {
  const sinFecha = await p.student.findMany({
    where: { birthDate: null, isActive: true },
    select: { id: true, firstName: true, lastName: true, schoolId: true }
  });
  const conFecha = await p.student.count({ where: { birthDate: { not: null }, isActive: true } });

  console.log('Con fecha de nacimiento:', conFecha);
  console.log('Sin fecha de nacimiento (null):', sinFecha.length);
  if (sinFecha.length > 0) {
    console.log('\nPrimeros 10 sin fecha:');
    sinFecha.slice(0, 10).forEach(s => console.log(` - [id:${s.id}] ${s.lastName} ${s.firstName} (colegio ${s.schoolId})`));
  }
}

main().finally(() => p.$disconnect());
