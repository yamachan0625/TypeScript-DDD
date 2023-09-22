import { inject, injectable } from 'tsyringe';

import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';

import { TaskDTO, taskDTO } from '../TaskDTO';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

type TaskFindByIdServiceCommand = {
  taskGroupId: string;
  taskId: string;
};

@injectable()
export class TaskFindByIdService {
  constructor(@inject('ITaskRepository') private repository: ITaskRepository) {}

  async execute({
    taskGroupId,
    taskId,
  }: TaskFindByIdServiceCommand): Promise<TaskDTO | null> {
    const task = await this.repository.findById(
      TaskGroupId.create(taskGroupId),
      TaskId.create(taskId)
    );

    if (task === null) return null;

    return taskDTO(task);
  }
}
