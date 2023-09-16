
import { mockDescription, Description } from './Description'

describe('Description', () => {
  it('正常系:モックのインスタンスが正常に生成される', () => {
    expect(mockDescription).toBeInstanceOf(Description) })
  it('正常系:正しい値を渡すと、正常にインスタンスが生成される', () => {
     const arg = 'Description'
     expect(Description.create(arg)).toBeInstanceOf(Description) })
  it('正常系:100文字以下の値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'あ'.repeat(100)
    expect(Description.create(arg).value).toBe(arg) })
  it('正常系:1文字以上の値を渡すと、正常にインスタンスが生成される', () => {
    const arg = 'あ'.repeat(1)
    expect(Description.create(arg).value).toBe(arg) })
  it('異常系:100文字より長い値を渡すと、例外が発生する', () => { 
    const arg = 'あ'.repeat(101)
    expect(() => { Description.create(arg) }).toThrow() })
  it('異常系:空文字を渡すと、例外が発生する', () => { 
    const arg = '' 
    expect(() => { Description.create(arg)}).toThrow() })
  it('異常系:許可されていない文字を渡すと、例外が発生する', () => { 
    const arg = '[]¥!%&@' 
    expect(() => { Description.create(arg) }).toThrow() 
  })
})
