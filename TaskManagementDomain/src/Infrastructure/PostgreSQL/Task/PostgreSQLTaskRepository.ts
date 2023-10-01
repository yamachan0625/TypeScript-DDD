import { Task as TaskDataModel } from '@prisma/client';

import { Task } from 'Domain/models/Task/Task/Task';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { Transaction } from '../transaction';
import { Title } from 'Domain/models/Task/Title/Title';
import { Description } from 'Domain/models/Task/Description/Description';
import { Status } from 'Domain/models/Task/Status/Status';
import { DueDate } from 'Domain/models/Task/DueDate/DueDate';
import { CreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { UpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';
import prisma from '../prismaClient';

export class PostgreSQLTaskRepository extends ITaskRepository {
  async findById(
    taskGroupId: TaskGroupId,
    taskId: TaskId,
    transaction?: Transaction
  ): Promise<Task | null> {
    const client = transaction ? transaction : prisma;
    const data = await client.task.findFirst({
      where: {
        AND: [{ id: taskId.value }, { taskGroupId: taskGroupId.value }],
      },
    });

    if (!data) return null;

    return this.dataModelToEntity(data);
  }

  async findAll(taskGroupId: TaskGroupId, transaction?: Transaction) {
    const client = transaction ? transaction : prisma;
    const datas = await client.task.findMany({
      where: {
        AND: [{ taskGroupId: taskGroupId.value }],
      },
    });

    return datas.map((data) => {
      return this.dataModelToEntity(data);
    });
  }

  async insert(
    task: Task,
    domainEventPublisher: DomainEventPublisher,
    transaction?: Transaction
  ) {
    domainEventPublisher.append(task);

    const client = transaction ? transaction : prisma;
    await client.task.create({
      data: this.entityToDataModel(task),
    });

    if (!transaction) {
      domainEventPublisher.publish();
    }
  }

  async update(
    task: Task,
    domainEventPublisher: DomainEventPublisher,
    transaction?: Transaction
  ) {
    domainEventPublisher.append(task);

    const client = transaction ? transaction : prisma;
    await client.task.update({
      where: { id: task.taskId.value },
      data: this.entityToDataModel(task),
    });

    if (!transaction) {
      domainEventPublisher.publish();
    }
  }

  async remove(
    task: Task,
    domainEventPublisher: DomainEventPublisher,
    transaction?: Transaction
  ) {
    domainEventPublisher.append(task);

    const client = transaction ? transaction : prisma;
    await client.task.delete({
      where: { id: task.taskId.value },
    });

    if (!transaction) {
      domainEventPublisher.publish();
    }
  }

  private dataModelToEntity(data: TaskDataModel): Task {
    return Task.reconstruct({
      taskId: TaskId.create(data.id),
      taskGroupId: TaskGroupId.create(data.taskGroupId),
      title: Title.create(data.title),
      description: Description.create(data.description),
      status: Status.fromKey(data.status),
      dueDate: data.dueDate ? DueDate.create(data.dueDate) : null,
      createdAt: CreatedAt.create(data.createdAt),
      updatedAt: UpdatedAt.create(data.updatedAt),
    });
  }
  private entityToDataModel(entity: Task): TaskDataModel {
    return {
      id: entity.taskId.value,
      taskGroupId: entity.taskGroupId.value,
      title: entity.title.value,
      description: entity.description.value,
      status: entity.status.value.key,
      dueDate: entity.dueDate?.value ?? null, // prisma schemaでnullableにする
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    };
  }
}
