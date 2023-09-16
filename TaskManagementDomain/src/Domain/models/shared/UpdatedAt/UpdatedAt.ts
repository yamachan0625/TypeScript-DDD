import { DateValueObject } from '../AbstractValueObject/DateValueObject';

export class UpdatedAt extends DateValueObject<'UpdatedAt'> {
  static create(arg: Date = new Date()): UpdatedAt {
    this.validate(arg);
    return new UpdatedAt(arg);
  }

  static validate(arg: Date) {
    this.assertPast(arg);
  }
}

export const mockUpdatedAt = UpdatedAt.create(new Date('2020-01-02'));
