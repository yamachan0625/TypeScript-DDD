import { IRunTransaction, ITransaction } from 'Domain/shared/IRunTransaction';
import { MockTransaction } from './MockTransaction';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';

export const runTransactionMock: IRunTransaction = async (
  domainEventPublisher: IDomainEventPublisher,
  transactionFunc: (transaction: ITransaction) => Promise<any>
) => {
  return await transactionFunc(new MockTransaction());
};
