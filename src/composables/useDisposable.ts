import process from 'node:process'
import type { Disposable } from 'vscode'
import { context, onDeactivate } from '../utils/lifecycle'

const disposables = new Set<Disposable>()

export function useDisposable<T extends Disposable>(disposable: T): T {
  if (process.env.NODE_ENV !== 'production') {
    if (!context.value)
      console.warn('Cannot add disposable to subscriptions: extension not activated')
  }
  if (disposables.size === 0) {
    onDeactivate(() => {
      disposables.forEach(d => d.dispose())
    })
  }
  disposables.add(disposable)
  return disposable
}
