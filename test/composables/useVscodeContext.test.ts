import type { ComputedRef, Ref, WritableComputedRef } from '@vue/runtime-core'
import { computed, ref } from '@vue/runtime-core'
import { describe, expectTypeOf, it } from 'vitest'
import { useVscodeContext } from '../../src/composables/useVscodeContext'

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
