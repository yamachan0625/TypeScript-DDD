
import { DateValueObject } from '../../shared/AbstractValueObject/DateValueObject'

export class DueDate extends DateValueObject<'DueDate'> {
  static create(arg: Date): DueDate {
    return new DueDate(arg)
  }
}

export const mockDueDate = DueDate.create(new Date())
