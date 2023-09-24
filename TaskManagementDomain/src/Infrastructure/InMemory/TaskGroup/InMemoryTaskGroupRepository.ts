import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { ITaskGroupRepository } from 'Domain/models/TaskGroup/ITaskGroupRepository';
import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';

export class InMemoryTaskGroupRepository extends ITaskGroupRepository {
  public DB: {
    [id: string]: TaskGroup;
  } = {};

  async findById(taskGroupId: TaskGroupId): Promise<TaskGroup | null> {
    const taskGroup = Object.entries(this.DB).find(([key]) => {
      return taskGroupId.value === key.toString();
    });

    return taskGroup[1] ?? null;
  }

  async findAll(): Promise<TaskGroup[]> {
    return Object.values(this.DB);
  }

  async insert(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher
  ) {
    this.DB[taskGroup.taskGroupId.value] = taskGroup;

    domainEventPublisher.append(taskGroup);
    domainEventPublisher.publish();
  }

  async update(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher
  ) {
    this.DB[taskGroup.taskGroupId.value] = taskGroup;

    domainEventPublisher.append(taskGroup);
    domainEventPublisher.publish();
  }

  async remove(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher
  ) {
    delete this.DB[taskGroup.taskGroupId.value];

    domainEventPublisher.append(taskGroup);
    domainEventPublisher.publish();
  }
}
