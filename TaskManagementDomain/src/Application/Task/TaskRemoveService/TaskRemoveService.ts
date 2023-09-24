import { inject, injectable } from 'tsyringe';

import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { transaction } from 'Infrastructure/PostgreSQL/transaction';

type TaskRemoveCommand = {
  taskGroupId: string;
  taskId: string;
};

@injectable()
export class TaskRemoveService {
  constructor(
    @inject('ITaskRepository')
    private repository: ITaskRepository,
    @inject('IDomainEventPublisher')
    private domainEventPublisher: IDomainEventPublisher
  ) {
    new DomainEventListener(domainEventPublisher.domainEventSubscriber);
  }

  async execute({ taskGroupId, taskId }: TaskRemoveCommand): Promise<void> {
    await transaction(this.domainEventPublisher, async (transaction) => {
      const task = await this.repository.findById(
        TaskGroupId.create(taskGroupId),
        TaskId.create(taskId),
        transaction
      );
      if (task === null) {
        throw new Error('taskIdに該当するデータが存在しません');
      }

      task.remove();

      await this.repository.remove(
        task,
        this.domainEventPublisher,
        transaction
      );
    });
  }
}
