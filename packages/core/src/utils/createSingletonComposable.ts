import { effectScope } from '@reactive-vscode/reactivity'

/**
 * Creates a composable that should only be called once.
 *
 * @category utilities
 */
export function createSingletonComposable<T>(fn: () => T): () => T {
  let result: T | undefined
  return () => {
    if (result !== undefined) {
      return result
    }
    const scope = effectScope(true)
    return result = scope.run(fn)!
  }
}
