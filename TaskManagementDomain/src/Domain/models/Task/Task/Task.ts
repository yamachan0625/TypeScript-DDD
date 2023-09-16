import { CreatedAt } from 'Domain/models/shared/CreatedAt/CreatedAt';
import { UpdatedAt } from 'Domain/models/shared/UpdatedAt/UpdatedAt';
import {
  Description,
  mockDescription,
} from 'Domain/models/Task/Description/Description';
import { DueDate, mockDueDate } from 'Domain/models/Task/DueDate/DueDate';
import { mockStatus, Status } from 'Domain/models/Task/Status/Status';
import {
  mockTaskGroupId,
  TaskGroupId,
} from 'Domain/models/TaskGroup/TaskGroupId/TaskGroupId';
import { TaskId } from 'Domain/models/Task/TaskId/TaskId';
import { mockTitle, Title } from 'Domain/models/Task/Title/Title';

import { TaskCreatedEvent } from '../DomainEvent/TaskCreatedEvent';
import { TaskRemovedEvent } from '../DomainEvent/TaskRemovedEvent';
import { TaskUpdatedEvent } from '../DomainEvent/TaskUpdatedEvent';
import { DomainEventStorable } from 'Domain/shared/DomainEvent/DomainEvent';

export class Task extends DomainEventStorable {
  private constructor(
    private readonly _taskId: TaskId,
    private _taskGroupId: TaskGroupId,
    private _title: Title | null,
    private _description: Description | null,
    private _status: Status,
    private _dueDate: DueDate | null,
    private readonly _createdAt: CreatedAt,
    private _updatedAt: UpdatedAt
  ) {
    super();
  }

  static create(input: {
    taskGroupId: TaskGroupId;
    title: Title | null;
    description: Description | null;
    status: Status;
    dueDate: DueDate | null;
  }): Task {
    const taskId = TaskId.create();
    const createdAt = CreatedAt.create();
    const updatedAt = UpdatedAt.create();

    const task = new Task(
      taskId,
      input.taskGroupId,
      input.title,
      input.description,
      input.status,
      input.dueDate,
      createdAt,
      updatedAt
    );

    task.addDomainEvent(new TaskCreatedEvent(task));

    return task;
  }

  static reconstruct(input: {
    taskId: TaskId;
    taskGroupId: TaskGroupId;
    title: Title | null;
    description: Description | null;
    status: Status;
    dueDate: DueDate | null;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
  }): Task {
    return new Task(
      input.taskId,
      input.taskGroupId,
      input.title,
      input.description,
      input.status,
      input.dueDate,
      input.createdAt,
      input.updatedAt
    );
  }

  update(input: {
    taskGroupId: TaskGroupId;
    title: Title | null;
    description: Description | null;
    status: Status;
    dueDate: DueDate | null;
  }): void {
    const updatedAt = UpdatedAt.create();
    this.changeUpdatedAt(updatedAt);

    this.changeTaskGroupId(input.taskGroupId);
    this.changeTitle(input.title);
    this.changeDescription(input.description);
    this.changeStatus(input.status);
    this.changeDueDate(input.dueDate);

    this.addDomainEvent(new TaskUpdatedEvent(this));
  }

  remove(): void {
    this.addDomainEvent(new TaskRemovedEvent(this));
  }

  get taskId(): TaskId {
    return this._taskId;
  }
  get taskGroupId(): TaskGroupId {
    return this._taskGroupId;
  }
  get title(): Title | null {
    return this._title;
  }
  get description(): Description | null {
    return this._description;
  }
  get status(): Status {
    return this._status;
  }
  get dueDate(): DueDate | null {
    return this._dueDate;
  }
  get createdAt(): CreatedAt {
    return this._createdAt;
  }
  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  private changeTaskGroupId(taskGroupId: TaskGroupId): void {
    this._taskGroupId = taskGroupId;
  }
  private changeTitle(title: Title | null): void {
    this._title = title;
  }
  private changeDescription(description: Description | null): void {
    this._description = description;
  }
  private changeStatus(status: Status): void {
    this._status = status;
  }
  private changeDueDate(dueDate: DueDate | null): void {
    this._dueDate = dueDate;
  }
  private changeUpdatedAt(updatedAt: UpdatedAt): void {
    if (this._createdAt.value > updatedAt.value) {
      throw new Error('更新日は作成日よりも後でなければいけません');
    }
    this._updatedAt = updatedAt;
  }
}

export const mockTask = Task.create({
  taskGroupId: mockTaskGroupId,
  title: mockTitle,
  description: mockDescription,
  status: mockStatus,
  dueDate: mockDueDate,
});
