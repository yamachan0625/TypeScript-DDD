import { DomainException } from 'Domain/shared/DomainException';
import { ValueObject } from './ValueObject';

export class DateValueObject<T extends string> extends ValueObject<T, Date> {
  static assertPast(date: Date) {
    const now = new Date();
    this.assertBefore(date, now);
  }
  static assertFuture(date: Date) {
    const now = new Date();
    this.assertAfter(date, now);
  }
  static assertBefore(value: Date, target: Date) {
    if (value.getTime() > target.getTime()) {
      throw new DomainException(
        `${target.toLocaleDateString()}より過去の日付を指定してください。`
      );
    }
  }
  static assertAfter(value: Date, target: Date) {
    if (value.getTime() < target.getTime()) {
      throw new DomainException(
        `${target.toLocaleDateString()}より未来の日付を指定してください。`
      );
    }
  }

  public toString() {
    return this.value.toISOString();
  }
}
