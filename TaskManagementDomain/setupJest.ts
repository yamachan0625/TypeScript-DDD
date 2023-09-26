import 'reflect-metadata';
import './src/Presentation/programTest'; // Test用のDIコンテナ
import prisma from 'Infrastructure/PostgreSQL/prismaClient';

beforeEach(async () => {
  const deleteAllDataPromises = [
    prisma.taskGroup.deleteMany(),
    prisma.task.deleteMany(),
  ];
  await prisma.$transaction(deleteAllDataPromises);
  await prisma.$disconnect();
});
