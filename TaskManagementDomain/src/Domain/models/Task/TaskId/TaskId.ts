import { IdValueObject } from 'Domain/models/shared/AbstractValueObject/IdValueObject';

export class TaskId extends IdValueObject<'TaskId'> {
  static create(arg?: string): TaskId {
    return new TaskId(arg);
  }
}

export const mockTaskId = TaskId.create('IdValueObject');
