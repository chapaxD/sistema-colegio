const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const count = await prisma.subject.count()
  console.log('SUBJECT_COUNT:', count)
  process.exit(0)
}

main()
