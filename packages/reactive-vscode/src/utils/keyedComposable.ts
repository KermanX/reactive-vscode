import { tryOnScopeDispose } from './tryOnScopeDispose'

export function createKeyedComposable<P extends unknown[], R, K>(
  fn: (...args: P) => R,
  key: NoInfer<(...args: P) => K>,
): (...args: P) => R {
  const cache = new Map<K, {
    data: R
    refCount: number
  }>()
  return (...args: P): R => {
    const k = key(...args)

    let cached = cache.get(k)
    if (cached) {
      cached.refCount++
    }
    else {
      cached = {
        data: fn(...args),
        refCount: 1,
      }
      cache.set(k, cached)
    }

    tryOnScopeDispose(() => {
      if (--cached.refCount === 0)
        cache.delete(k)
    })

    return cached.data
  }
}
