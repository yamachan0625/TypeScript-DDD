import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';

export type TaskGroupDTO = {
  taskGroupId: string;
  taskGroupName: string;
  createdAt: Date;
  updatedAt: Date;
};

export const taskGroupDTO = (entity: TaskGroup): TaskGroupDTO => {
  return Object.freeze({
    taskGroupId: entity.taskGroupId.value,
    taskGroupName: entity.taskGroupName.value,
    createdAt: entity.createdAt.value,
    updatedAt: entity.updatedAt.value,
  });
};
