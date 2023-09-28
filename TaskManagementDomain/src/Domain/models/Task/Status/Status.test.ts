import { mockStatus, Status } from './Status';

describe('Status', () => {
  const cases = [
    ['INPROGRESS', Status.INPROGRESS()],
    ['DONE', Status.DONE()],
    ['ARCHIVE', Status.ARCHIVE()],
  ] as const;
  it('正常系:モックのインスタンスが正常に生成される', () => {
    expect(mockStatus).toBeInstanceOf(Status);
  });
  test.each(cases)(
    '正常系：%sについて、正常にインスタンスが生成される',
    (_, input) => {
      expect(input).toBeInstanceOf(Status);
    }
  );
  test.each(cases)(
    '正常系:"%s"というkeyから、正常にインスタンスが生成される',
    (key, expected) => {
      expect(Status.fromKey(key)).toEqual(expected);
    }
  );
});
