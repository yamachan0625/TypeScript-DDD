import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { Task, mockTask } from './Task/Task';

export class TaskCreatedEvent implements DomainEvent {
  readonly eventName = 'TaskCreatedEvent';
  constructor(public readonly task: Task) {}
}
export const mockTaskCreatedEvent = new TaskCreatedEvent(mockTask);

export class TaskUpdatedEvent implements DomainEvent {
  readonly eventName = 'TaskUpdatedEvent';
  constructor(public readonly task: Task) {}
}
export const mockTaskUpdatedEvent = new TaskUpdatedEvent(mockTask);

export class TaskRemovedEvent implements DomainEvent {
  readonly eventName = 'TaskRemovedEvent';
  constructor(public readonly task: Task) {}
}
export const mockTaskRemovedEvent = new TaskRemovedEvent(mockTask);
