import { isEqual } from 'lodash';

export abstract class ValueObject<T extends string, S> {
  readonly _valueObjectType: T | undefined;
  private readonly _value: S;
  protected constructor(_value: S) {
    this._value = Object.freeze(_value);
  }

  public get value(): S {
    return this._value;
  }

  public equals(compareValue: ValueObject<T, S>): boolean {
    if (compareValue == null) {
      return false;
    }

    // 値オブジェクト内の全てのプロパティ同士を比較する
    return isEqual(this.value, compareValue.value);
  }
}
