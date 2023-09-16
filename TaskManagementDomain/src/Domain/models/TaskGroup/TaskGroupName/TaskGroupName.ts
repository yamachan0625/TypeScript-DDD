import { StringValueObject } from '../../shared/AbstractValueObject/StringValueObject';

export class TaskGroupName extends StringValueObject<'TaskGroupName'> {
  static create(arg: string): TaskGroupName {
    this.validate(arg);
    return new TaskGroupName(arg);
  }

  static validate(arg: string): void {
    this.assertEqualOrShorter(arg, this.MAX_LENGTH);
    this.assertEqualOrLonger(arg, this.MIN_LENGTH);
    this.assertRegex(arg, this.REGEX);
  }

  static readonly MAX_LENGTH = 1000;
  static readonly MIN_LENGTH = 1;
  static readonly REGEX = new RegExp(
    `^[a-zA-Z0-9０-９ａ-ｚぁ-んァ-ン一-龠%&]+$`,
    'u'
  );
}

export const mockTaskGroupName = TaskGroupName.create('Name');
