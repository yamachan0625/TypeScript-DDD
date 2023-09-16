import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { Task, mockTask } from '../Task/Task';

export class TaskRemovedEvent implements DomainEvent {
  readonly eventName = 'TaskRemovedEvent';
  constructor(public readonly task: Task) {}
}

export const mockTaskRemovedEvent = new TaskRemovedEvent(mockTask);
