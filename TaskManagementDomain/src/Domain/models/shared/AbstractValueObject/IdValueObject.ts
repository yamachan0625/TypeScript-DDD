import { nanoid } from 'nanoid';

import { StringValueObject } from './StringValueObject';

export abstract class IdValueObject<
  T extends string
> extends StringValueObject<T> {
  constructor(arg: string = nanoid()) {
    IdValueObject.validate(arg);
    super(arg);
  }
  static validate(arg: string): void {
    this.assertEqualOrShorter(arg, this.MAX_LENGTH);
    this.assertEqualOrLonger(arg, this.MIN_LENGTH);
    this.assertRegex(arg, this.REGEX);
  }
  static readonly MAX_LENGTH = 100;
  static readonly MIN_LENGTH = 4;
  static readonly REGEX = new RegExp(`^[a-zA-Z0-9０-９\-_]+$`, 'u');
}
