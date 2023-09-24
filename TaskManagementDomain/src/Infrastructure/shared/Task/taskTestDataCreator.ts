import { container } from 'tsyringe';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { Task } from 'Domain/models/Task/Task/Task';
import { TaskId, mockTaskId } from 'Domain/models/Task/TaskId/TaskId';
import {
  TaskGroupId,
  mockTaskGroupId,
} from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { Title, mockTitle } from 'Domain/models/Task/Title/Title';
import {
  Description,
  mockDescription,
} from 'Domain/models/Task/Description/Description';
import { Status, mockStatus } from 'Domain/models/Task/Status/Status';
import { DueDate, mockDueDate } from 'Domain/models/Task/DueDate/DueDate';
import {
  CreatedAt,
  mockCreatedAt,
} from 'Domain/models/shared/CreatedAt/CreatedAt';
import {
  UpdatedAt,
  mockUpdatedAt,
} from 'Domain/models/shared/UpdatedAt/UpdatedAt';

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

    const entity = Task.reconstruct({
      taskId: TaskId.create(taskId),
      taskGroupId: TaskGroupId.create(taskGroupId),
      title: Title.create(title),
      description: Description.create(description),
      status: Status.fromKey(status),
      dueDate: DueDate.create(dueDate),
      createdAt: CreatedAt.create(createdAt),
      updatedAt: UpdatedAt.create(updatedAt),
    });

    await repository.insert(entity, domainEventPublisher);

    return entity;
  };
