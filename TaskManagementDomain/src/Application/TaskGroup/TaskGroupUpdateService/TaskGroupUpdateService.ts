import { inject, injectable } from 'tsyringe';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { TaskGroupName } from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';

import { ITaskGroupRepository } from 'Domain/models/TaskGroup/ITaskGroupRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';
import { ITransaction } from 'Application/ITransaction';
import { ApplicationException } from 'Application/shared/ApplicationException';

type TaskGroupUpdateCommand = {
  taskGroupId: string;
  taskGroupName: string;
};

@injectable()
export class TaskGroupUpdateService {
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

  async execute({
    taskGroupId,
    taskGroupName,
  }: TaskGroupUpdateCommand): Promise<void> {
    await this.transaction(this.domainEventPublisher, async (transaction) => {
      const taskGroup = await this.repository.findById(
        TaskGroupId.create(taskGroupId),
        transaction
      );

      if (taskGroup === null) {
        throw new ApplicationException(
          'taskGroupIdに該当するデータが存在しません',
          404,
          'not_found'
        );
      }

      taskGroup.update({
        taskGroupName: TaskGroupName.create(taskGroupName),
      });

      await this.repository.update(
        taskGroup,
        this.domainEventPublisher,
        transaction
      );
    });
  }
}
