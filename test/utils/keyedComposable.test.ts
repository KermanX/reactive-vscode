import { effectScope } from '@vue/runtime-core'
import { describe, expect, it, vi } from 'vitest'
import { createKeyedComposable } from '../../src/utils/keyedComposable'

const fnImpl = (a: number) => ({ a })

describe('createKeyedComposable', () => {
  it('should cache correctly', () => {
    const fn = vi.fn(fnImpl)
    const composable = createKeyedComposable(fn, a => a)

    const scope1 = effectScope()
    scope1.run(() => {
      const result1 = composable(1)
      const result2 = composable(1)

      expect(result1.a).toBe(1)
      expect(result1).toBe(result2)
      expect(fn).toBeCalledTimes(1)

      const result3 = composable(2)

      expect(result3.a).toBe(2)
      expect(fn).toBeCalledTimes(2)
    })
    scope1.stop()
  })

  it('should clear cache correctly', () => {
    const composable = createKeyedComposable(fnImpl, a => a)

    let result1: { a: number } | undefined
    const scope1 = effectScope()
    scope1.run(() => {
      result1 = composable(1)
    })
    scope1.stop()

    let result2: { a: number } | undefined
    const scope2 = effectScope()
    scope2.run(() => {
      result2 = composable(1)
    })
    scope2.stop()

    vi.waitUntil(() => result1 && result2)

    expect(result1?.a).toBe(1)
    expect(result2?.a).toBe(1)
    expect(result1).not.toBe(1)
  })
})
