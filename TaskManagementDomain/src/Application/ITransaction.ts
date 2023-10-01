import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { ApplicationException } from './shared/ApplicationException';

export type ITransaction = <T>(
  domainEventPublisher: IDomainEventPublisher,
  transactionFunc: (transaction: unknown) => Promise<T>
) => Promise<T>;

export const transactionMock = async <T>(
  domainEventPublisher: IDomainEventPublisher,
  transactionFunc: (transaction: unknown) => Promise<T>
): Promise<T> => {
  try {
    const result = await transactionFunc(() => {});

    // transactionの完了を待ってドメインイベントを発行する
    domainEventPublisher.publish();

    return result;
  } catch (error) {
    domainEventPublisher.clear();
    throw new ApplicationException('transaction失敗');
  }
};
