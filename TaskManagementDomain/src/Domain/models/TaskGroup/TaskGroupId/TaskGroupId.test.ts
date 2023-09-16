
import { mockTaskGroupId, TaskGroupId } from './TaskGroupId'

describe('TaskGroupId', () => {
  it('正常系:モックのインスタンスが正常に生成される', () => {
    expect(mockTaskGroupId).toBeInstanceOf(TaskGroupId)
  })
  it('正常系:デフォルト値で渡すと、正常にインスタンスが生成される', () => {
    expect(TaskGroupId.create().value.length).toBeGreaterThanOrEqual(8)
    expect(TaskGroupId.create().value.length).toBeLessThanOrEqual(100)
    expect(TaskGroupId.create().value).toMatch(/^[a-zA-Z\d_-]+$/)
  })
  it('正常系:正しい値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'IdValueObject'
    expect(TaskGroupId.create(arg)).toBeInstanceOf(TaskGroupId)
  })
  it('正常系:100文字以下の値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'a'.repeat(100)
    expect(TaskGroupId.create(arg).value).toBe(arg)
  })
  it('正常系:4文字以上の値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'a'.repeat(4)
    expect(TaskGroupId.create(arg).value).toBe(arg)
  })
  it('異常系:100文字より長い値を渡すと、例外が発生する', () => {
    const arg = 'a'.repeat(101)
    expect(() => { TaskGroupId.create(arg) }).toThrow()
  })
  it('異常系:4文字未満の値を渡すと、例外が発生する', () => {
    const arg = 'a'.repeat(3)
    expect(() => { TaskGroupId.create(arg)}).toThrow()
  })
  it('異常系:空文字を渡すと、例外が発生する', () => {
    const arg = ''
    expect(() => { TaskGroupId.create(arg) }).toThrow()
  })
  it('異常系:許可されていない文字を渡すと、例外が発生する', () => {
    const arg = '[]¥!%&@'
    expect(() => { TaskGroupId.create(arg) }).toThrow()
  })
})

