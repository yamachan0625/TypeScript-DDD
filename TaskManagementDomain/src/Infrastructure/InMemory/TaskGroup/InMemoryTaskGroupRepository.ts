import { TaskGroup } from 'Domain/models/TaskGroup/TaskGroup';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import {
  TaskGroupDataModel,
  ITaskGroupRepository,
} from 'Domain/models/TaskGroup/ITaskGroupRepository';
import { DomainEventPublisher } from 'Domain/shared/DomainEvent/DomainEventPublisher';
import { TaskGroupFactory } from 'Infrastructure/shared/TaskGroup/TaskGroupFactory';

export class InMemoryTaskGroupRepository extends ITaskGroupRepository {
  protected factory: TaskGroupFactory;
  constructor() {
    super();
    this.factory = new TaskGroupFactory();
  }
  public DB: {
    [taskGroupId: string]: TaskGroupDataModel;
  } = {};

  async findById(taskGroupId: TaskGroupId): Promise<TaskGroup | null> {
    const taskGroup = Object.entries(this.DB).find(([key]) => {
      return taskGroupId.value === key.toString();
    });

    if (!taskGroup) return null;

    const data = taskGroup[1];

    return this.factory.toEntity({
      ...data,
    });
  }

  async findAll(): Promise<TaskGroup[]> {
    const data = Object.values(this.DB);
    return data.map((entity) =>
      this.factory.toEntity({
        ...entity,
      })
    );
  }

  async insert(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher
  ) {
    this.DB[taskGroup.taskGroupId.value] = this.factory.toDataModel(taskGroup);

    domainEventPublisher.append(taskGroup);
    domainEventPublisher.publish();
  }

  async update(
    taskGroup: TaskGroup,
    domainEventPublisher: DomainEventPublisher
  ) {
    this.DB[taskGroup.taskGroupId.value] = this.factory.toDataModel(taskGroup);

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
