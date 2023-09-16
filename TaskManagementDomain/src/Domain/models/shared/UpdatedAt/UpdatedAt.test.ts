import { addSeconds } from 'date-fns'

import { mockUpdatedAt, UpdatedAt } from './UpdatedAt'

describe('Updated', () => {
  it('正常系:モックのインスタンスが正常に生成される', () => {
    expect(mockUpdatedAt).toBeInstanceOf(UpdatedAt)
  })
  it('正常系:正しい値を渡すと、正常にインスタンスが生成される', () => {
    const arg = new Date()
    expect(UpdatedAt.create(arg).value).toBe(arg)
  })
  it('異常系:未来の日付を渡すと、例外が発生する', () => {
    const arg = addSeconds(new Date(), 1)
    expect(() => {
      UpdatedAt.create(arg)
    }).toThrow()
  })
})
