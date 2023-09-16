import { DateValueObject } from '../AbstractValueObject/DateValueObject';

export class CreatedAt extends DateValueObject<'CreatedAt'> {
  static create(arg: Date = new Date()): CreatedAt {
    this.validate(arg);
    return new CreatedAt(arg);
  }
  static validate(arg: Date) {
    this.assertPast(arg);
  }
}

export const mockCreatedAt = CreatedAt.create(new Date('2020-01-01'));
