import { IDomainEventSubscriber } from 'Domain/shared/DomainEvent/IDomainEventSubscriber';

import {
  TaskGroupCreatedEvent,
  TaskGroupRemovedEvent,
  TaskGroupUpdatedEvent,
} from 'Domain/models/TaskGroup/DomainEvent';
import {
  TaskCreatedEvent,
  TaskRemovedEvent,
  TaskUpdatedEvent,
} from 'Domain/models/Task/DomainEvent';

export class DomainEventListener {
  constructor(domainEventSubscriber: IDomainEventSubscriber) {
    // TaskGroup
    domainEventSubscriber.once<TaskGroupCreatedEvent>(
      'TaskGroupCreatedEvent',
      async (event) => {}
    );
    domainEventSubscriber.once<TaskGroupUpdatedEvent>(
      'TaskGroupUpdatedEvent',
      async (event) => {}
    );
    domainEventSubscriber.once<TaskGroupRemovedEvent>(
      'TaskGroupRemovedEvent',
      async (event) => {}
    );

    // Task
    domainEventSubscriber.once<TaskCreatedEvent>(
      'TaskCreatedEvent',
      async (event) => {}
    );
    domainEventSubscriber.once<TaskUpdatedEvent>(
      'TaskUpdatedEvent',
      async (event) => {}
    );
    domainEventSubscriber.once<TaskRemovedEvent>(
      'TaskRemovedEvent',
      async (event) => {}
    );
  }
}
