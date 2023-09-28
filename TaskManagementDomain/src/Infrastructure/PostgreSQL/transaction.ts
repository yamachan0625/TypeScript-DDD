import { DefaultArgs } from '@prisma/client/runtime/library';
import { IDomainEventPublisher } from '../../Domain/shared/DomainEvent/DomainEventPublisher';
import { Prisma, PrismaClient } from '@prisma/client';
import prisma from './prismaClient';
import { ITransaction } from 'Application/ITransaction';

export type Transaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
export const transaction: ITransaction = async <T>(
  domainEventPublisher: IDomainEventPublisher,
  transactionFunc: (transaction: Transaction) => Promise<T>
): Promise<T> => {
  const result = await prisma.$transaction(async (transaction) => {
    try {
      return await transactionFunc(transaction);
    } catch (error) {
      domainEventPublisher.clear();
      throw new Error(error);
    }
  });

  // transactionの完了を待ってドメインイベントを発行する
  domainEventPublisher.publish();

  return result;
};
