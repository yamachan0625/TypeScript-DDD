import { TaskGroupDataModel } from 'Domain/models/TaskGroup/ITaskGroupRepository';

import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { TaskGroupName } from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';
import { CreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { UpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';

import { IFactory } from 'Domain/shared/IFactory';

export class TaskGroupFactory
  implements IFactory<TaskGroup, TaskGroupDataModel>
{
  toEntity({
    taskGroupId,
    taskGroupName,
    createdAt,
    updatedAt,
  }: TaskGroupDataModel): TaskGroup {
    return TaskGroup.reconstruct({
      taskGroupId: TaskGroupId.create(taskGroupId),
      taskGroupName: TaskGroupName.create(taskGroupName),
      createdAt: CreatedAt.create(createdAt),
      updatedAt: UpdatedAt.create(updatedAt),
    });
  }
  toDataModel(model: TaskGroup): TaskGroupDataModel {
    return {
      taskGroupId: model.taskGroupId.value,
      taskGroupName: model.taskGroupName.value,
      createdAt: model.createdAt.value,
      updatedAt: model.updatedAt.value,
    };
  }
}
