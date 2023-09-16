import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { Task, mockTask } from '../Task/Task';

export class TaskUpdatedEvent implements DomainEvent {
  readonly eventName = 'TaskUpdatedEvent';
  constructor(public readonly task: Task) {}
}

export const mockTaskUpdatedEvent = new TaskUpdatedEvent(mockTask);
