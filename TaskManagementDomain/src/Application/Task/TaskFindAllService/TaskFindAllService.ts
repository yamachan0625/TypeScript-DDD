import { inject, injectable } from 'tsyringe';

import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';

import { TaskDTO, taskDTO } from '../TaskDTO';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

type TaskFindAllServiceCommand = {
  taskGroupId: string;
};

@injectable()
export class TaskFindAllService {
  constructor(@inject('ITaskRepository') private repository: ITaskRepository) {}

  async execute({
    taskGroupId,
  }: TaskFindAllServiceCommand): Promise<TaskDTO[]> {
    const tasks = await this.repository.findAll(
      TaskGroupId.create(taskGroupId)
    );

    return tasks.map((task) => taskDTO(task));
  }
}
