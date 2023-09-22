import { inject, injectable } from 'tsyringe';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { Title } from 'Domain/models/Task/Title/Title';
import { Description } from 'Domain/models/Task/Description/Description';
import { Status, StatusKey } from 'Domain/models/Task/Status/Status';
import { DueDate } from 'Domain/models/Task/DueDate/DueDate';

import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { IRunTransaction } from 'Domain/shared/IRunTransaction';
import { DomainEventListener } from 'Application/DomainEvent/DomainEventListener';

type TaskUpdateCommand = {
  taskId: string;
  taskGroupId: string;
  title?: string;
  description?: string;
  status?: StatusKey;
  dueDate?: Date | null;
};

@injectable()
export class TaskUpdateService {
  constructor(
    @inject('ITaskRepository')
    private repository: ITaskRepository,
    @inject('IDomainEventPublisher')
    private domainEventPublisher: IDomainEventPublisher,
    @inject('IRunTransaction')
    private transaction: IRunTransaction
  ) {
    new DomainEventListener(domainEventPublisher.domainEventSubscriber);
  }

  async execute({
    taskId,
    taskGroupId,
    title,
    description,
    status,
    dueDate,
  }: TaskUpdateCommand): Promise<void> {
    await this.transaction(this.domainEventPublisher, async (transaction) => {
      const task = await this.repository.findById(
        TaskGroupId.create(taskGroupId),
        TaskId.create(taskId),
        transaction
      );
      if (task === null) {
        throw new Error('taskIdに該当するデータが存在しません');
      }

      task.update({
        taskGroupId: TaskGroupId.create(taskGroupId),
        title: Title.create(title),
        description: Description.create(description),
        status: Status.fromKey(status),
        dueDate: dueDate
          ? DueDate.create(dueDate)
          : dueDate === null
          ? null
          : undefined,
      });

      await this.repository.update(
        task,
        this.domainEventPublisher,
        transaction
      );
    });
  }
}