import 'reflect-metadata';
import './src/Presentation/programTest'; // Test用のDIコンテナ
import prisma from 'Infrastructure/PostgreSQL/prismaClient';

beforeEach(async () => {
  const deleteAllDataPromises = [
    prisma.task.deleteMany(),
    prisma.taskGroup.deleteMany(),
  ];
  await prisma.$transaction(deleteAllDataPromises);
  await prisma.$disconnect();
});
