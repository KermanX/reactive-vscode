import { getCurrentScope } from '@reactive-vscode/reactivity'
import type { Disposable } from 'vscode'
import { extensionScope } from '../utils'

/**
 * Dispose the disposable when the current scope is disposed. See `vscode::Disposable`.
 *
 * @category lifecycle
 */
export function useDisposable<T extends Disposable>(disposable: T): T {
  const scope = getCurrentScope() ?? extensionScope

  // @ts-expect-error internal property
  scope.cleanups.push(disposable.dispose.bind(disposable))

  return disposable
}

/**
 * Creates a disposable from a function, and register it to the current scope.
 *
 * @example ```ts
 * useDisposableFn(watchEffect(() => { }))
 * ```
 *
 * @category lifecycle
 */
export function useDisposableFn(fn: () => void): Disposable {
  return useDisposable({ dispose: fn })
}
