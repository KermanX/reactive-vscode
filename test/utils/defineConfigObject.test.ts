import { describe, expectTypeOf, it } from 'vitest'
import { defineConfigObject } from 'reactive-vscode'

describe('keyedComposable', () => {
  it.skip('should have correct type', () => {
    const config = defineConfigObject('test', {
      num: 1,
      obj: { a: 1 },
    })
    expectTypeOf(config.num).toMatchTypeOf<number>()
    expectTypeOf(config.obj).toMatchTypeOf<{ a: number }>()
  })
})
