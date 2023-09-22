import EventEmitter from 'events';

import { DomainEvent } from '../../Domain/shared/DomainEvent/DomainEvent';
import { IDomainEventSubscriber } from '../../Domain/shared/DomainEvent/IDomainEventSubscriber';

export class DomainEventSubscriber implements IDomainEventSubscriber {
  emitter: EventEmitter;

  constructor() {
    const emitter = new EventEmitter();
    this.emitter = emitter;
  }

  on<T extends DomainEvent>(
    eventName: T['eventName'],
    callback: (event: T) => void
  ) {
    this.emitter.on(eventName, callback);
  }

  once<T extends DomainEvent>(
    eventName: T['eventName'],
    callback: (event: T) => void
  ) {
    this.emitter.once(eventName, callback);
  }

  emit(eventName: DomainEvent['eventName'], event: DomainEvent) {
    this.emitter.emit(eventName, event);
  }
}

export class MockDomainEventSubscriber implements IDomainEventSubscriber {
  // eslint-disable-next-line
  mockFn: jest.Mock<any, any>;
  emitter: EventEmitter;

  constructor() {
    this.mockFn = jest.fn();
    const emitter = new EventEmitter();
    this.emitter = emitter;
  }

  on<T extends DomainEvent>(eventName: T['eventName']) {
    this.emitter.on(eventName, () => {
      this.mockFn(eventName);
    });
  }

  once<T extends DomainEvent>(eventName: T['eventName']) {
    this.emitter.once(eventName, () => {
      this.mockFn(eventName);
    });
  }

  emit(eventName: DomainEvent['eventName'], event: DomainEvent) {
    this.emitter.emit(eventName, event);
  }

  assertNotCall() {
    // eslint-disable-next-line
    expect(this.mockFn).toHaveBeenCalledTimes(0);
  }

  // テストで利用するアサート関数
  assertCall<T extends DomainEvent>(eventName: T['eventName'], count = 1) {
    // eslint-disable-next-line
    expect(this.mockFn).toHaveBeenNthCalledWith(count, eventName);
  }
}
