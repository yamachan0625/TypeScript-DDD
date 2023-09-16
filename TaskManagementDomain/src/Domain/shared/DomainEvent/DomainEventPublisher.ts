import { inject, injectable } from 'tsyringe'

import { DomainEvent, DomainEventStorable } from './DomainEvent'
import type { IDomainEventSubscriber } from './IDomainEventSubscriber'

export interface IDomainEventPublisher {
  readonly domainEventSubscriber: IDomainEventSubscriber
  append(eventStorable: DomainEventStorable): void
  publish(): void
}

@injectable()
export class DomainEventPublisher implements IDomainEventPublisher {
  private events: DomainEvent[] = []
  constructor(
    @inject('IDomainEventSubscriber')
    public readonly domainEventSubscriber: IDomainEventSubscriber
  ) {
    this.domainEventSubscriber = domainEventSubscriber
  }

  public append(eventStorable: DomainEventStorable): void {
    for (const event of eventStorable.getDomainEvents()) {
      this.events.push(event)
    }
    eventStorable.clearDomainEvents()
  }

  public publish(): void {
    for (const event of this.events) {
      this.domainEventSubscriber.emit(event.eventName, event)
    }
    this.clearDomainEvents()
  }

  private clearDomainEvents(): void {
    this.events = []
  }
}
