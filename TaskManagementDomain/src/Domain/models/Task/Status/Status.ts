import { EnumValueObject } from '../../shared/AbstractValueObject/EnumValueObject';

export type StatusOption =
  | { key: 'INPROGRESS'; label: '進行中' }
  | { key: 'DONE'; label: '完了' }
  | { key: 'ARCHIVE'; label: 'アーカイブ' };
export type StatusKey = StatusOption['key'];
export type StatusLabel = StatusOption['label'];

export class Status extends EnumValueObject<'Status', StatusOption> {
  static options = [
    { key: 'INPROGRESS', label: '進行中' },
    { key: 'DONE', label: '完了' },
    { key: 'ARCHIVE', label: 'アーカイブ' },
  ] as const;
  static keys(): StatusKey[] {
    return this.getKeys(this.options);
  }
  static labels(): StatusLabel[] {
    return this.getLabels(this.options);
  }
  static fromKey(key: StatusKey): Status {
    const target = this.findByKey(this.options, key);
    return new Status(target);
  }

  static INPROGRESS(): Status {
    return this.fromKey('INPROGRESS');
  }
  static DONE(): Status {
    return this.fromKey('DONE');
  }
  static ARCHIVE(): Status {
    return this.fromKey('ARCHIVE');
  }
}

export const mockStatus = Status.INPROGRESS();
