import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { ITaskGroupRepository } from 'Domain/models/TaskGroup/ITaskGroupRepository';

import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';

import { Transaction } from '../transaction';
import { TaskGroup as TaskGroupDataModel } from '@prisma/client';
import { UpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';
import { CreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { TaskGroupName } from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';
import prisma from '../prismaClient';

export class PostgreSQLTaskGroupRepository extends ITaskGroupRepository {
  async findById(
    taskGroupId: TaskGroupId,
    transaction?: Transaction
  ): Promise<TaskGroup | null> {
    const client = transaction ? transaction : prisma;
    const data = await client.taskGroup.findFirst({
      where: {
        AND: [{ id: taskGroupId.value }],
      },
    });

    if (!data) return null;

    return this.dataModelToEntity(data);
  }

  async findAll(transaction?: Transaction) {
    const client = transaction ? transaction : prisma;
    const datas = await client.taskGroup.findMany();

    return datas.map((data) => {
      return this.dataModelToEntity(data);
    });
  }

  async insert(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher,
    transaction?: Transaction
  ) {
    domainEventPublisher.append(taskGroup);

    const client = transaction ? transaction : prisma;
    await client.taskGroup.create({
      data: this.entityToDataModel(taskGroup),
    });

    if (!transaction) {
      domainEventPublisher.publish();
    }
  }

  async update(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher,
    transaction?: Transaction
  ) {
    domainEventPublisher.append(taskGroup);

    const client = transaction ? transaction : prisma;
    await client.task.update({
      where: { id: taskGroup.taskGroupId.value },
      data: this.entityToDataModel(taskGroup),
    });

    if (!transaction) {
      domainEventPublisher.publish();
    }
  }

  async remove(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher,
    transaction?: Transaction
  ) {
    domainEventPublisher.append(taskGroup);

    const client = transaction ? transaction : prisma;
    await client.task.delete({
      where: { id: taskGroup.taskGroupId.value },
    });

    if (!transaction) {
      domainEventPublisher.publish();
    }
  }

  private dataModelToEntity(data: TaskGroupDataModel): TaskGroup {
    return TaskGroup.reconstruct({
      taskGroupId: TaskGroupId.create(data.id),
      taskGroupName: TaskGroupName.create(data.name),
      createdAt: CreatedAt.create(data.createdAt),
      updatedAt: UpdatedAt.create(data.updatedAt),
    });
  }
  private entityToDataModel(entity: TaskGroup): TaskGroupDataModel {
    return {
      id: entity.taskGroupId.value,
      name: entity.taskGroupName.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    };
  }
}
