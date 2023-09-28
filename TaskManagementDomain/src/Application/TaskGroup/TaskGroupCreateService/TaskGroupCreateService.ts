import { inject, injectable } from 'tsyringe';
import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { ITaskGroupRepository } from 'Domain/models/TaskGroup/ITaskGroupRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';
import { TaskGroupName } from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';
import { ITransaction } from 'Application/ITransaction';

type TaskGroupCreateServiceCommand = {
  taskGroupName: string;
};

@injectable()
export class TaskGroupCreateService {
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
    taskGroupName,
  }: TaskGroupCreateServiceCommand): Promise<{ taskGroupId: string }> {
    const taskGroupId = await this.transaction(
      this.domainEventPublisher,
      async (transaction) => {
        const taskGroup = TaskGroup.create({
          taskGroupName: TaskGroupName.create(taskGroupName),
        });

        await this.repository.insert(
          taskGroup,
          this.domainEventPublisher,
          transaction
        );

        return taskGroup.taskGroupId;
      }
    );

    return { taskGroupId: taskGroupId.value };
  }
}
