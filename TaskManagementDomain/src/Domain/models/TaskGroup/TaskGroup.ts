import {
  TaskGroupCreatedEvent,
  TaskGroupUpdatedEvent,
  TaskGroupRemovedEvent,
} from './DomainEvent';

import { CreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { UpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';
import { TaskGroupId } from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import {
  mockTaskGroupName,
  TaskGroupName,
} from 'Domain/models/TaskGroup/TaskGroupName/TaskGroupName';
import { DomainEventStorable } from 'Domain/shared/DomainEvent/DomainEvent';

export class TaskGroup extends DomainEventStorable {
  private constructor(
    private readonly _taskGroupId: TaskGroupId,
    private _taskGroupName: TaskGroupName,
    private readonly _createdAt: CreatedAt,
    private _updatedAt: UpdatedAt
  ) {
    super();
  }

  static create(input: { taskGroupName: TaskGroupName }): TaskGroup {
    const taskGroupId = TaskGroupId.create();
    const createdAt = CreatedAt.create();
    const updatedAt = UpdatedAt.create();

    const taskGroup = new TaskGroup(
      taskGroupId,
      input.taskGroupName,
      createdAt,
      updatedAt
    );

    taskGroup.addDomainEvent(new TaskGroupCreatedEvent(taskGroup));

    return taskGroup;
  }

  static reconstruct(input: {
    taskGroupId: TaskGroupId;
    taskGroupName: TaskGroupName;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
  }): TaskGroup {
    return new TaskGroup(
      input.taskGroupId,
      input.taskGroupName,
      input.createdAt,
      input.updatedAt
    );
  }

  update(input: { taskGroupName: TaskGroupName }): void {
    const updatedAt = UpdatedAt.create();
    this.changeUpdatedAt(updatedAt);

    this.changeTaskGroupName(input.taskGroupName);

    this.addDomainEvent(new TaskGroupUpdatedEvent(this));
  }

  remove(): void {
    this.addDomainEvent(new TaskGroupRemovedEvent(this));
  }

  get taskGroupId(): TaskGroupId {
    return this._taskGroupId;
  }
  get taskGroupName(): TaskGroupName {
    return this._taskGroupName;
  }
  get createdAt(): CreatedAt {
    return this._createdAt;
  }
  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  private changeTaskGroupName(taskGroupName: TaskGroupName): void {
    this._taskGroupName = taskGroupName;
  }

  private changeUpdatedAt(updatedAt: UpdatedAt): void {
    if (this._createdAt.value > updatedAt.value) {
      throw new Error('更新日は作成日よりも後でなければいけません');
    }
    this._updatedAt = updatedAt;
  }
}

export const mockTaskGroup = TaskGroup.create({
  taskGroupName: mockTaskGroupName,
});
