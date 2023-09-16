import { mockTaskGroupName, TaskGroupName } from './TaskGroupName';

describe('TaskGroupName', () => {
  it('正常系:モックのインスタンスが正常に生成される', () => {
    expect(mockTaskGroupName).toBeInstanceOf(TaskGroupName);
  });
  it('正常系:正しい値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'TaskGroupName';
    expect(TaskGroupName.create(arg)).toBeInstanceOf(TaskGroupName);
  });
  it('正常系:1000文字以下の値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'あ'.repeat(1000);
    expect(TaskGroupName.create(arg).value).toBe(arg);
  });
  it('正常系:1文字以上の値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'あ'.repeat(1);
    expect(TaskGroupName.create(arg).value).toBe(arg);
  });
  it('異常系:1000文字より長い値を渡すと、例外が発生する', () => {
    const arg = 'あ'.repeat(1001);
    expect(() => {
      TaskGroupName.create(arg);
    }).toThrow();
  });
  it('異常系:空文字を渡すと、例外が発生する', () => {
    const arg = '';
    expect(() => {
      TaskGroupName.create(arg);
    }).toThrow();
  });
  it('異常系:許可されていない文字を渡すと、例外が発生する', () => {
    const arg = '[]¥!%&@';
    expect(() => {
      TaskGroupName.create(arg);
    }).toThrow();
  });
});
