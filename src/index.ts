import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const allUsers = await prisma.task.create();

  const allUsers = await prisma.task.findMany({
    include: {
      taskGroup: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
