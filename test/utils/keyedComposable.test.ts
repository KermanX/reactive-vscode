import { describe, expect, it, vi } from 'vitest'
import { createKeyedComposable } from 'reactive-vscode'

const fnImpl = (a: number) => ({ a })

describe('keyedComposable', () => {
  it('should cache correctly', () => {
    const fn = vi.fn(fnImpl)
    const composable = createKeyedComposable(fn, a => a)

    const result1 = composable(1)
    const result2 = composable(1)

    expect(result1.a).toBe(1)
    expect(result1).toBe(result2)
    expect(fn).toBeCalledTimes(1)

    const result3 = composable(2)

    expect(result3.a).toBe(2)
    expect(fn).toBeCalledTimes(2)
  })
})
