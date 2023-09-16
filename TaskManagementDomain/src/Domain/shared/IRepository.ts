import { DomainEventStorable } from './DomainEvent/DomainEvent'
import { IFactory } from './IFactory'

export type DataModel = Record<string, any>

export type QueryWhereType<T extends DataModel> =
  | {
      fieldPath: Exclude<keyof Omit<T, 'tenantId'>, number | symbol>
      operator: '==' | '!='
      value: unknown
    }
  | {
      fieldPath: Exclude<keyof Omit<T, 'tenantId'>, number | symbol>
      operator: '<' | '<=' | '>=' | '>'
      value: string
    }
  | {
      fieldPath: Exclude<keyof Omit<T, 'tenantId'>, number | symbol>
      operator: 'array-contains' | 'in' | 'not-in' | 'array-contains-any'
      value: string[]
    }

export type QueryOrderType<T extends DataModel> = {
  fieldPath: Exclude<keyof Omit<T, 'tenantId'>, number | symbol>
  directionStr: 'asc' | 'desc'
}
export type QueryLimitType = number

export abstract class IRepository<
  T extends DomainEventStorable = DomainEventStorable,
  S extends DataModel = DataModel
> {
  protected abstract readonly factory: IFactory<T, S>
}
