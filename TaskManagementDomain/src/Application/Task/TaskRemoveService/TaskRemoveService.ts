import { inject, injectable } from 'tsyringe';

import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { ITransaction } from 'Application/ITransaction';
import { ApplicationException } from 'Application/shared/ApplicationException';

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
    private domainEventPublisher: IDomainEventPublisher,
    @inject('ITransaction')
    private transaction: ITransaction
  ) {
    new DomainEventListener(domainEventPublisher.domainEventSubscriber);
  }

  async execute({ taskGroupId, taskId }: TaskRemoveCommand): Promise<void> {
    await this.transaction(this.domainEventPublisher, async (transaction) => {
      const task = await this.repository.findById(
        TaskGroupId.create(taskGroupId),
        TaskId.create(taskId),
        transaction
      );
      if (task === null) {
        throw new ApplicationException(
          'taskIdに該当するデータが存在しません',
          404,
          'not_found'
        );
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
