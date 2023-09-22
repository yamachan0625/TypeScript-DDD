import { DomainEventStorable } from './DomainEvent/DomainEvent';
import { IFactory } from './IFactory';

export type DataModel = Record<string, any>;

export abstract class IRepository<
  T extends DomainEventStorable = DomainEventStorable,
  S extends DataModel = DataModel
> {
  protected abstract readonly factory: IFactory<T, S>;
}
