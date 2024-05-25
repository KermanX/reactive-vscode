import { describe, expectTypeOf, it } from 'vitest'
import type { ConfigRef, ConfigType } from 'reactive-vscode'
import { defineConfigs } from 'reactive-vscode'

describe('keyedComposable', () => {
  it.skip('should have correct type', () => {
    expectTypeOf(
      defineConfigs('test', {
        str1: 'string',
        str2: String,
        num1: 'number',
        num2: Number,
        bool1: 'boolean',
        bool2: Boolean,
        null1: 'null',
        null2: null,
        int1: 'integer',
        arr1: 'array',
        arr2: Array,
        obj1: 'object',
        obj2: Object,
        obj3: Object as ConfigType<{ a: number }>,
        union1: ['string', 'number'],
        union2: [String, Number],
        union3: [String, Number, 'boolean'],
      }),
    ).toMatchTypeOf<{
      str1: ConfigRef<string>
      str2: ConfigRef<string>
      num1: ConfigRef<number>
      num2: ConfigRef<number>
      bool1: ConfigRef<boolean>
      bool2: ConfigRef<boolean>
      null1: ConfigRef<null>
      null2: ConfigRef<null>
      int1: ConfigRef<number>
      arr1: ConfigRef<any[]>
      arr2: ConfigRef<any[]>
      obj1: ConfigRef<Record<string | number, any>>
      obj2: ConfigRef<Record<string | number, any>>
      obj3: ConfigRef<{ a: number }>
      union1: ConfigRef<string | number>
      union2: ConfigRef<string | number>
      union3: ConfigRef<string | number | boolean>
    }>()
  })
})
