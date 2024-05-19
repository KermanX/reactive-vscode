import { tryOnScopeDispose } from './tryOnScopeDispose'

export function createKeyedComposable<T extends (...args: any) => any, K extends object>(
  fn: T,
  key: NoInfer<(...args: Parameters<T>) => K>,
): T {
  const cache = new Map<K, {
    data: ReturnType<T>
    refCount: number
  }>()
  return ((...args: Parameters<T>) => {
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
  }) as T
}
