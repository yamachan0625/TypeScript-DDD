import { DomainEvent } from './DomainEvent'

export interface IDomainEventSubscriber {
  on<T extends DomainEvent>(
    eventName: T['eventName'],
    callback: (event: T) => void
  ): void
  once<T extends DomainEvent>(
    eventName: T['eventName'],
    callback: (event: T) => void
  ): void
  emit(eventName: DomainEvent['eventName'], event: DomainEvent): void
}
