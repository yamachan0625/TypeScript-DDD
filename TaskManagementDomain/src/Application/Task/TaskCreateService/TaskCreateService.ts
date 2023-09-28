import { inject, injectable } from 'tsyringe';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { Title } from 'Domain/models/Task/Title/Title';
import { Description } from 'Domain/models/Task/Description/Description';
import { Status, StatusKey } from 'Domain/models/Task/Status/Status';
import { DueDate } from 'Domain/models/Task/DueDate/DueDate';
import { Task } from 'Domain/models/Task/Task/Task';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';
import { ITransaction } from 'Infrastructure/PostgreSQL/transaction';

type TaskCreateServiceCommand = {
  taskGroupId: string;
  title: string;
  description: string;
  status: StatusKey;
  dueDate: Date | null;
};

@injectable()
export class TaskCreateService {
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

  async execute({
    taskGroupId,
    title,
    description,
    status,
    dueDate,
  }: TaskCreateServiceCommand): Promise<{ taskId: string }> {
    const taskId = await this.transaction(
      this.domainEventPublisher,
      async (transaction) => {
        const task = Task.create({
          taskGroupId: TaskGroupId.create(taskGroupId),
          title: Title.create(title),
          description: Description.create(description),
          status: Status.fromKey(status),
          dueDate: dueDate ? DueDate.create(dueDate) : null,
        });

        await this.repository.insert(
          task,
          this.domainEventPublisher,
          transaction
        );

        return task.taskId;
      }
    );

    return { taskId: taskId.value };
  }
}
