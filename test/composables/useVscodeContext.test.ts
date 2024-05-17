import type { ComputedRef, Ref, WritableComputedRef } from 'reactive-vscode'
import { computed, ref, useVscodeContext } from 'reactive-vscode'
import { describe, expectTypeOf, it } from 'vitest'

describe('useVscodeContext', () => {
  it.skip('should have correct types', () => {
    expectTypeOf(useVscodeContext('myContext', ref('a'))).toEqualTypeOf<Ref<string>>()
    expectTypeOf(useVscodeContext('myContext', () => 'a')).toEqualTypeOf<ComputedRef<string>>()
    expectTypeOf(useVscodeContext('myContext', computed(() => 'a'))).toEqualTypeOf<ComputedRef<string>>()
    expectTypeOf(useVscodeContext('myContext', computed({
      get() {
        return 'a'
      },
      set() { },
    }))).toEqualTypeOf<WritableComputedRef<string>>()
  })
})
