import { Task } from 'Domain/models/Task/Task/Task';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { ITaskRepository } from 'Domain/models/Task/ITaskRepository';
import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

export class InMemoryTaskRepository extends ITaskRepository {
  public DB: {
    [id: string]: Task;
  } = {};

  async findById(
    taskGroupId: TaskGroupId,
    taskId: TaskId
  ): Promise<Task | null> {
    const task = Object.entries(this.DB).find(([key]) => {
      return taskId.value === key.toString();
    });

    return task[1] ?? null;
  }

  async findAll(taskGroupId: TaskGroupId): Promise<Task[]> {
    return Object.values(this.DB);
  }

  async insert(task: Task, domainEventPublisher: DomainEventPublisher) {
    this.DB[task.taskId.value] = task;

    domainEventPublisher.append(task);
    domainEventPublisher.publish();
  }

  async update(task: Task, domainEventPublisher: DomainEventPublisher) {
    this.DB[task.taskId.value] = task;

    domainEventPublisher.append(task);
    domainEventPublisher.publish();
  }

  async remove(task: Task, domainEventPublisher: DomainEventPublisher) {
    delete this.DB[task.taskId.value];

    domainEventPublisher.append(task);
    domainEventPublisher.publish();
  }
}
