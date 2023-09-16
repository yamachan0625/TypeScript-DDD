import { EnumValueObject } from '../../shared/AbstractValueObject/EnumValueObject';

export type StatusOption =
  | { key: 'inprogress'; label: '進行中' }
  | { key: 'done'; label: '完了' }
  | { key: 'archive'; label: 'アーカイブ' };
export type StatusKey = StatusOption['key'];
export type StatusLabel = StatusOption['label'];

export class Status extends EnumValueObject<'Status', StatusOption> {
  static options = [
    { key: 'inprogress', label: '進行中' },
    { key: 'done', label: '完了' },
    { key: 'archive', label: 'アーカイブ' },
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
    return this.fromKey('inprogress');
  }
  static DONE(): Status {
    return this.fromKey('done');
  }
  static ARCHIVE(): Status {
    return this.fromKey('archive');
  }
}

export const mockStatus = Status.INPROGRESS();
