import { getCurrentScope } from '@vue/runtime-core'
import type { Disposable } from 'vscode'
import { extensionScope } from '../utils'

export function useDisposable<T extends Disposable>(disposable: T): T {
  const scope = getCurrentScope() ?? extensionScope

  // @ts-expect-error internal property
  scope.cleanups.push(disposable.dispose.bind(disposable))

  return disposable
}
