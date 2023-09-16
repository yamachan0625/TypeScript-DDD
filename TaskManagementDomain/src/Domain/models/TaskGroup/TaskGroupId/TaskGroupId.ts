import { IdValueObject } from 'Domain/models/shared/AbstractValueObject/IdValueObject';

export class TaskGroupId extends IdValueObject<'TaskGroupId'> {
  static create(arg?: string): TaskGroupId {
    return new TaskGroupId(arg);
  }
}

export const mockTaskGroupId = TaskGroupId.create('IdValueObject');
