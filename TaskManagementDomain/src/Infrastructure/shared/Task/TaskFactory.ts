import { CreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { UpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';
import { DueDate } from 'Domain/models/Task/DueDate/DueDate';
import { TaskDataModel } from 'Domain/models/Task/ITaskRepository';
import { Status } from 'Domain/models/Task/Status/Status';
import { Task } from 'Domain/models/Task/Task/Task';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { Title } from 'Domain/models/Task/Title/Title';
import { IFactory } from 'Domain/shared/IFactory';
import { Description } from 'Domain/models/Task/Description/Description';

export class TaskFactory implements IFactory<Task, TaskDataModel> {
  toEntity({
    taskId,
    taskGroupId,
    title,
    description,
    status,
    dueDate,
    createdAt,
    updatedAt,
  }: TaskDataModel): Task {
    return Task.reconstruct({
      taskId: TaskId.create(taskId),
      taskGroupId: TaskGroupId.create(taskGroupId),
      title: Title.create(title),
      description: Description.create(description),
      status: Status.fromKey(status),
      dueDate: DueDate.create(dueDate),
      createdAt: CreatedAt.create(createdAt),
      updatedAt: UpdatedAt.create(updatedAt),
    });
  }
  toDataModel(model: Task): TaskDataModel {
    return {
      taskId: model.taskId.value,
      taskGroupId: model.taskGroupId.value,
      title: model.title.value,
      description: model.description.value,
      status: model.status.value.key,
      dueDate: model.dueDate?.value ?? null,
      createdAt: model.createdAt.value,
      updatedAt: model.updatedAt.value,
    };
  }
}
