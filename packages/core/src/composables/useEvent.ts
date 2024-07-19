import type { Disposable, Event } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * @category utilities
 * @reactive `Event`
 */
export function useEvent<T>(event: Event<T>, listeners?: ((e: T) => any)[]) {
  const addListener = (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]) => {
    useDisposable(event(listener, thisArgs, disposables))
  }

  listeners?.forEach(listener => addListener(listener))

  return addListener
}
