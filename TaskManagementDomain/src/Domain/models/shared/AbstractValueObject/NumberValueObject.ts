import { DomainException } from 'Domain/shared/DomainException';
import { ValueObject } from './ValueObject';

export class NumberValueObject<T extends string> extends ValueObject<
  T,
  number
> {
  protected static assertInteger(value: number): void {
    if (!Number.isInteger(value)) {
      throw new DomainException(`整数で入力してください ${value}`);
    }
  }
  protected static assertLess(value: number, threshold: number): void {
    if (value >= threshold) {
      throw new DomainException(
        `${threshold}より小さい数字を入力してください； ${value}`
      );
    }
  }
  protected static assertEqualOrLess(value: number, threshold: number): void {
    if (value > threshold) {
      throw new DomainException(
        `${threshold}以下の数字を入力してください： ${value}`
      );
    }
  }
  protected static assertEqual(value: number, threshold: number): void {
    if (value !== threshold) {
      throw new DomainException(
        `${threshold}と等しい数を入力してください： ${value}`
      );
    }
  }
  protected static assertEqualOrMore(value: number, threshold: number): void {
    if (value < threshold) {
      throw new DomainException(
        `${threshold}以上の数字を入力してください：${value}`
      );
    }
  }
  protected static assertMore(value: number, threshold: number): void {
    if (value <= threshold) {
      throw new DomainException(
        `${threshold}より大きい数字を入力してください：${value}`
      );
    }
  }
}
