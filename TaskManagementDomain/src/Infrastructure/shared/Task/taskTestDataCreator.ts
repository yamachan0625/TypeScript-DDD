import { container } from 'tsyringe';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { Task } from 'Domain/models/Task/Task/Task';
import { TaskFactory } from './TaskFactory';
import { mockTaskId } from 'Domain/models/Task/TaskId/TaskId';
import { mockTaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { mockTitle } from 'Domain/models/Task/Title/Title';
import { mockDescription } from 'Domain/models/Task/Description/Description';
import { mockStatus } from 'Domain/models/Task/Status/Status';
import { mockDueDate } from 'Domain/models/Task/DueDate/DueDate';
import { mockCreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { mockUpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';

import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';

export const TEST_DATA = {
  taskId: mockTaskId.value,
  taskGroupId: mockTaskGroupId.value,
  title: mockTitle.value,
  description: mockDescription.value,
  status: mockStatus.value.key,
  dueDate: mockDueDate.value,
  createdAt: mockCreatedAt.value,
  updatedAt: mockUpdatedAt.value,
};

export const taskTestDataCreator =
  (repository: ITaskRepository) =>
  async ({
    taskId = TEST_DATA.taskId,
    taskGroupId = TEST_DATA.taskGroupId,
    title = TEST_DATA.title,
    description = TEST_DATA.description,
    status = TEST_DATA.status,
    dueDate = TEST_DATA.dueDate,
    createdAt = TEST_DATA.createdAt,
    updatedAt = TEST_DATA.updatedAt,
  }): Promise<Task> => {
    const domainEventPublisher = container.resolve(DomainEventPublisher);

    const factory = new TaskFactory();
    const entity = factory.toEntity({
      taskId,
      taskGroupId,
      title,
      description,
      status,
      dueDate,
      createdAt,
      updatedAt,
    });

    await repository.insert(entity, domainEventPublisher);

    return entity;
  };
