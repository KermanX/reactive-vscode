import { onScopeDispose } from '@vue/runtime-core'

export function createKeyedComposable<T extends (...args: any) => any>(
  fn: T,
  key: NoInfer<(...args: Parameters<T>) => any>,
): T {
  const cache = new Map<any, ReturnType<T>>()
  let firstCall = true
  return ((...args: Parameters<T>) => {
    const k = key(...args)
    const existing = cache.get(k)
    if (existing)
      return existing
    const result = fn(...args)
    cache.set(k, result)
    if (firstCall) {
      firstCall = false
      onScopeDispose(() => {
        cache.clear()
        firstCall = true
      })
    }
    return result
  }) as T
}
