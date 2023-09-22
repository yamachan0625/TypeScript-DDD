import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { IRepository } from 'Domain/shared/IRepository';
import { ITransaction } from 'Domain/shared/IRunTransaction';

export abstract class ITaskGroupRepository extends IRepository<
  TaskGroup,
  TaskGroupDataModel
> {
  abstract findById(
    taskGroupId: TaskGroupId,
    transaction?: ITransaction
  ): Promise<TaskGroup | null>;
  abstract findAll(transaction?: ITransaction): Promise<TaskGroup[]>;
  abstract insert(
    taskGroup: TaskGroup,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: ITransaction
  ): Promise<void>;
  abstract update(
    taskGroup: TaskGroup,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: ITransaction
  ): Promise<void>;
  abstract remove(
    taskGroup: TaskGroup,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: ITransaction
  ): Promise<void>;
}

export type TaskGroupDataModel = {
  taskGroupId: string;
  taskGroupName: string;
  createdAt: Date;
  updatedAt: Date;
};
export type TaskGroupQueryDataModel = Omit<TaskGroupDataModel, 'tenantId'>;
