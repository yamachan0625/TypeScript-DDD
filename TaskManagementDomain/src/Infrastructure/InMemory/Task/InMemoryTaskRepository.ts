import { Task } from 'Domain/models/Task/Task/Task';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import {
  TaskDataModel,
  ITaskRepository,
} from 'Domain/models/Task/ITaskRepository';
import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskFactory } from 'Infrastructure/shared/Task/TaskFactory';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';

export class InMemoryTaskRepository extends ITaskRepository {
  protected factory: TaskFactory;
  constructor() {
    super();
    this.factory = new TaskFactory();
  }
  public DB: {
    [taskId: string]: TaskDataModel;
  } = {};

  async findById(
    taskGroupId: TaskGroupId,
    taskId: TaskId
  ): Promise<Task | null> {
    const task = Object.entries(this.DB).find(([key]) => {
      return taskId.value === key.toString();
    });

    if (!task) return null;

    const data = task[1];

    return this.factory.toEntity({
      ...data,
    });
  }

  async findAll(taskGroupId: TaskGroupId): Promise<Task[]> {
    const data = Object.values(this.DB);
    return data.map((entity) =>
      this.factory.toEntity({
        ...entity,
      })
    );
  }

  async insert(task: Task, domainEventPublisher: DomainEventPublisher) {
    this.DB[task.taskId.value] = this.factory.toDataModel(task);

    domainEventPublisher.append(task);
    domainEventPublisher.publish();
  }

  async update(task: Task, domainEventPublisher: DomainEventPublisher) {
    this.DB[task.taskId.value] = this.factory.toDataModel(task);

    domainEventPublisher.append(task);
    domainEventPublisher.publish();
  }

  async remove(task: Task, domainEventPublisher: DomainEventPublisher) {
    delete this.DB[task.taskId.value];

    domainEventPublisher.append(task);
    domainEventPublisher.publish();
  }
}
