import { Task } from 'Domain/models/Task/Task/Task';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskGroupId } from '../TaskGroup/TaskGroupId/TaskGroupId';

export abstract class ITaskRepository {
  abstract findById(
    taskGroupId: TaskGroupId,
    taskId: TaskId,
    transaction?: unknown
  ): Promise<Task | null>;
  abstract findAll(
    taskGroupId: TaskGroupId,
    transaction?: unknown
  ): Promise<Task[]>;
  abstract insert(
    task: Task,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: unknown
  ): Promise<void>;
  abstract update(
    task: Task,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: unknown
  ): Promise<void>;
  abstract remove(
    task: Task,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: unknown
  ): Promise<void>;
}
