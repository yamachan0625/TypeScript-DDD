import { StringValueObject } from '../../shared/AbstractValueObject/StringValueObject';

export class Title extends StringValueObject<'Title'> {
  static create(arg: string): Title {
    this.validate(arg);
    return new Title(arg);
  }

  static validate(arg: string): void {
    this.assertEqualOrShorter(arg, this.MAX_LENGTH);
    this.assertEqualOrLonger(arg, this.MIN_LENGTH);
    this.assertRegex(arg, this.REGEX);
  }

  static readonly MAX_LENGTH = 100;
  static readonly MIN_LENGTH = 1;
  static readonly REGEX = new RegExp(
    `^[a-zA-Z0-9０-９ａ-ｚぁ-んァ-ン一-龠%&]+$`,
    'u'
  );
}

export const mockTitle = Title.create('Title');
