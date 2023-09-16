
import { DueDate, mockDueDate } from './DueDate'

describe('DueDate', () => {
  it('正常系:モックのインスタンスが正常に生成される', () => {
    expect(mockDueDate).toBeInstanceOf(DueDate)
  })
  it('正常系:正しい値を渡すと、正常にインスタンスが生成される', () => {
    const arg = new Date()
    expect(DueDate.create(arg)).toBeInstanceOf(DueDate)
  })
})

