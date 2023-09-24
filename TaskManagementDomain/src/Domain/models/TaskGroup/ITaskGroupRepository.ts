import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';

export abstract class ITaskGroupRepository {
  abstract findById(
    taskGroupId: TaskGroupId,
    transaction?: unknown
  ): Promise<TaskGroup | null>;
  abstract findAll(transaction?: unknown): Promise<TaskGroup[]>;
  abstract insert(
    taskGroup: TaskGroup,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: unknown
  ): Promise<void>;
  abstract update(
    taskGroup: TaskGroup,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: unknown
  ): Promise<void>;
  abstract remove(
    taskGroup: TaskGroup,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: unknown
  ): Promise<void>;
}
