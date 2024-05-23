/**
 * Creates a composable that should only be called once.
 *
 * @category utilities
 */
export function createSingletonComposable<T>(fn: () => T): () => T {
  let result: T | undefined
  return () => result ??= fn()
}
