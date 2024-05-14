import process from 'node:process'

export function createSingletonComposable<T>(fn: () => T): () => T {
  let result: T | undefined
  let called = false
  return () => {
    if (result)
      return result
    if (process.env.NODE_ENV !== 'production') {
      if (called)
        throw new Error('Singleton composable called recursively')
    }
    called = true
    return result = fn()
  }
}
