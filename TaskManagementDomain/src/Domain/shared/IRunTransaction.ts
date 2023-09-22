import { IDomainEventPublisher } from './DomainEvent/DomainEventPublisher';
import { DataModel } from './IRepository';

export type IRunTransaction<T extends ITransaction = ITransaction> = <
  V extends any
>(
  domainEventPublisher: IDomainEventPublisher,
  transactionFunc: (transaction: T) => Promise<V>
) => Promise<V>;

export interface ITransaction {
  get(id: string, collection: any): Promise<any>;
  getAll(collection: any): Promise<any>;
  set<T extends DataModel>(collection: any, id: string, data: T): void;
  update<T extends DataModel>(collection: any, id: string, data: T): void;
  remove(collection: any, id: string): void;
}
