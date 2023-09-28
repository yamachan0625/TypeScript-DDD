import prisma from 'Infrastructure/PostgreSQL/prismaClient';

export const initializeTestDB = async () => {
  const deleteAllDataPromises = [
    prisma.task.deleteMany(),
    prisma.taskGroup.deleteMany(),
  ];
  await prisma.$transaction(deleteAllDataPromises);
  await prisma.$disconnect();
};
