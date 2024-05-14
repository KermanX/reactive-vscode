import { onScopeDispose } from '@vue/runtime-core'
import type { Disposable } from 'vscode'

export function useDisposable<T extends Disposable>(disposable: T): T {
  onScopeDispose(() => disposable.dispose())
  return disposable
}
