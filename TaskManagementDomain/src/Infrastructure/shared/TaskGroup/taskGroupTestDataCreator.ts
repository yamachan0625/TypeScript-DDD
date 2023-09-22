import { container } from 'tsyringe';
import { ITaskGroupRepository } from 'Domain/models/TaskGroup/ITaskGroupRepository';
import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupFactory } from './TaskGroupFactory';
import { mockTaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { mockTaskGroupName } from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';
import { mockCreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { mockUpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';

import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';

export const TEST_DATA = {
  taskGroupId: mockTaskGroupId.value,
  taskGroupName: mockTaskGroupName.value,
  createdAt: mockCreatedAt.value,
  updatedAt: mockUpdatedAt.value,
};

export const taskGroupTestDataCreator =
  (repository: ITaskGroupRepository) =>
  async ({
    taskGroupId = TEST_DATA.taskGroupId,
    taskGroupName = TEST_DATA.taskGroupName,
    createdAt = TEST_DATA.createdAt,
    updatedAt = TEST_DATA.updatedAt,
  }): Promise<TaskGroup> => {
    const domainEventPublisher = container.resolve(DomainEventPublisher);

    const factory = new TaskGroupFactory();
    const entity = factory.toEntity({
      taskGroupId,
      taskGroupName,
      createdAt,
      updatedAt,
    });

    await repository.insert(entity, domainEventPublisher);

    return entity;
  };
