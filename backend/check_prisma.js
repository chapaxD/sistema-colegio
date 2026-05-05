const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('Student fields:', Object.keys(prisma.student.fields || {}));
process.exit(0);
