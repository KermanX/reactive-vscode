import type { ConfigType } from 'reactive-vscode'
import { defineConfigObject } from 'reactive-vscode'
import { describe, expectTypeOf, it } from 'vitest'

describe('keyedComposable', () => {
  it.skip('should have correct type', () => {
    const config1 = defineConfigObject('test', {
      num: Number,
      obj: Object as ConfigType<{ a: number }>,
    })
    expectTypeOf(config1.num).toMatchTypeOf<number>()
    expectTypeOf(config1.obj).toMatchTypeOf<{ a: number }>()

    const config2 = defineConfigObject('test', {
      num: 1,
      obj: { a: 1 },
    })
    expectTypeOf(config2.num).toMatchTypeOf<number>()
    expectTypeOf(config2.obj).toMatchTypeOf<{ a: number }>()
  })
})
