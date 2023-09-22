import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { TaskGroup, mockTaskGroup } from './TaskGroup';

export class TaskGroupCreatedEvent implements DomainEvent {
  readonly eventName = 'TaskGroupCreatedEvent';
  constructor(public readonly task: TaskGroup) {}
}
export const mockTaskGroupCreatedEvent = new TaskGroupCreatedEvent(
  mockTaskGroup
);

export class TaskGroupUpdatedEvent implements DomainEvent {
  readonly eventName = 'TaskGroupUpdatedEvent';
  constructor(public readonly task: TaskGroup) {}
}
export const mockTaskGroupUpdatedEvent = new TaskGroupUpdatedEvent(
  mockTaskGroup
);

export class TaskGroupRemovedEvent implements DomainEvent {
  readonly eventName = 'TaskGroupRemovedEvent';
  constructor(public readonly task: TaskGroup) {}
}
export const mockTaskGroupRemovedEvent = new TaskGroupRemovedEvent(
  mockTaskGroup
);
