import { ValueObject } from './ValueObject';

export type EnumType = { key: string; label: string };
export abstract class EnumValueObject<
  T extends string,
  S extends EnumType
> extends ValueObject<T, S> {
  static options: Readonly<EnumType[]>;
  protected static getKeys<U extends EnumType>(
    options: Readonly<U[]>
  ): U['key'][] {
    return options.map((option) => option.key);
  }
  protected static getLabels<U extends Readonly<EnumType>>(
    options: Readonly<U[]>
  ): U['label'][] {
    return options.map((option) => option.label);
  }
  protected static findByKey<S extends EnumType>(
    arr: readonly S[],
    key: string
  ): S {
    this.validateKey(key);
    const target = arr.find((item) => item.key === key);
    if (!target) {
      throw Error(`キーが見つかりません: ${key}`);
    }
    return target;
  }

  protected static findLabel<S extends EnumType>(
    arr: readonly S[],
    label: string
  ): S {
    this.validateLabel(label);
    const target = arr.find((item) => item.label === label);
    if (!target) {
      throw Error(`ラベルが見つかりません: ${label}`);
    }
    return target;
  }

  static validateValue(value: EnumType): void {
    if (!this.options.includes(value)) {
      throw Error(`値が正しくありません: ${value}`);
    }
  }
  static validateKey(key: string): void {
    const keys = this.options.map((item) => item.key);
    if (!keys.includes(key)) {
      throw Error(`キーが正しくありません: ${key}`);
    }
  }
  static validateLabel(label: string) {
    const labels = this.options.map((item) => item.label);
    if (!labels.includes(label)) {
      throw Error(`ラベルが正しくありません: ${label}`);
    }
  }
}
