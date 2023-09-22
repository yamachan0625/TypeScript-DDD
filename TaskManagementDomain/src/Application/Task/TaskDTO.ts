import { StatusOption } from 'Domain/models/Task/Status/Status';
import { Task } from 'Domain/models/Task/Task/Task';

export type TaskDTO = {
  taskId: string;
  taskGroupId: string;
  title: string;
  description: string;
  status: StatusOption;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const taskDTO = (entity: Task): TaskDTO => {
  return Object.freeze({
    taskId: entity.taskId.value,
    taskGroupId: entity.taskGroupId.value,
    title: entity.title.value,
    description: entity.description.value,
    status: entity.status.value,
    dueDate: entity.dueDate?.value ?? null,
    createdAt: entity.createdAt.value,
    updatedAt: entity.updatedAt.value,
  });
};
