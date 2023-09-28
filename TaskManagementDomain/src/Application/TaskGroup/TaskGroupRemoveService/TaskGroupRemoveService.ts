import { inject, injectable } from 'tsyringe';

import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { ITaskGroupRepository } from 'Domain/models/TaskGroup/ITaskGroupRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { ITransaction } from 'Application/ITransaction';

type TaskGroupRemoveCommand = {
  taskGroupId: string;
};

@injectable()
export class TaskGroupRemoveService {
  constructor(
    @inject('ITaskGroupRepository')
    private repository: ITaskGroupRepository,
    @inject('IDomainEventPublisher')
    private domainEventPublisher: IDomainEventPublisher,
    @inject('ITransaction')
    private transaction: ITransaction
  ) {
    new DomainEventListener(domainEventPublisher.domainEventSubscriber);
  }

  async execute({ taskGroupId }: TaskGroupRemoveCommand): Promise<void> {
    await this.transaction(this.domainEventPublisher, async (transaction) => {
      const taskGroup = await this.repository.findById(
        TaskGroupId.create(taskGroupId),
        transaction
      );
      if (taskGroup === null) {
        throw new Error('taskGroupIdに該当するデータが存在しません');
      }

      taskGroup.remove();

      await this.repository.remove(
        taskGroup,
        this.domainEventPublisher,
        transaction
      );
    });
  }
}
