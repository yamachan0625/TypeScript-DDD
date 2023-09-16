import { Task } from 'Domain/models/Task/Task/Task';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import {
  IRepository,
  QueryLimitType,
  QueryOrderType,
  QueryWhereType,
} from 'Domain/shared/IRepository';
import { ITransaction } from 'Domain/shared/IRunTransaction';
import { StatusKey } from 'Domain/models/Task/Status/Status';

export abstract class ITaskRepository extends IRepository<Task, TaskDataModel> {
  abstract findById(
    taskId: TaskId,
    transaction?: ITransaction
  ): Promise<Task | null>;
  abstract findAll(transaction?: ITransaction): Promise<Task[]>;
  abstract query(
    where: QueryWhereType<TaskDataModel>,
    limit?: QueryLimitType,
    order?: QueryOrderType<TaskDataModel>,
    transaction?: ITransaction
  ): Promise<Task[]>;
  abstract insert(
    task: Task,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: ITransaction
  ): Promise<void>;
  abstract update(
    task: Task,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: ITransaction
  ): Promise<void>;
  abstract remove(
    task: Task,
    domainEventPublisher: IDomainEventPublisher,
    transaction?: ITransaction
  ): Promise<void>;
}

export type TaskDataModel = {
  taskId: string;
  taskGroupId: string;
  title: string | null;
  description: string | null;
  status: StatusKey;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
export type TaskQueryDataModel = Omit<TaskDataModel, 'tenantId'>;
