import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { Task, mockTask } from '../Task/Task';

export class TaskCreatedEvent implements DomainEvent {
  readonly eventName = 'TaskCreatedEvent';
  constructor(public readonly task: Task) {}
}

export const mockTaskCreatedEvent = new TaskCreatedEvent(mockTask);
