import process from 'node:process'
import type { Disposable } from 'vscode'
import { context } from '../utils/lifecycle'

export function useDisposable<T extends Disposable>(disposable: T): T {
  if (process.env.NODE_ENV !== 'production') {
    if (!context.value)
      console.warn('Cannot add disposable to subscriptions: extension not activated')
  }
  context.value?.subscriptions.push(disposable)
  return disposable
}
