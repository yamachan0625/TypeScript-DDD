import { DomainException } from 'Domain/shared/DomainException';
import { ValueObject } from './ValueObject';

export abstract class StringValueObject<T extends string> extends ValueObject<
  T,
  string
> {
  protected static assertLonger(value: string, threshold: number): void {
    if (value.length <= threshold) {
      throw new DomainException(
        `${threshold}文字より長い文字列を入力してください: ${value}`
      );
    }
  }
  protected static assertEqualOrLonger(value: string, threshold: number): void {
    if (value.length < threshold) {
      throw new DomainException(
        `${threshold}文字以上で入力してください: ${value}`
      );
    }
  }
  protected static assertEqualLength(value: string, length: number): void {
    if (value.length !== length) {
      throw new DomainException(`${length}文字で入力してください: ${value}`);
    }
  }
  protected static assertEqualOrShorter(
    value: string,
    threshold: number
  ): void {
    if (value.length > threshold) {
      throw new DomainException(
        `${threshold}文字以下で入力してください: ${value}`
      );
    }
  }
  protected static assertShorter(value: string, threshold: number): void {
    if (value.length >= threshold) {
      throw new DomainException(
        `${threshold}文字より短い文字列を入力してください: ${value}`
      );
    }
  }
  protected static assertRegex(
    value: string,
    regex: RegExp,
    message = '許可されていない文字が含まれています'
  ): void {
    if (!regex.test(value)) {
      throw new DomainException(`${message}: ${value}`);
    }
  }
}
