import type { Event } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * @category utilities
 * @reactive `Event`
 */
export function useEvent<T>(event: Event<T>, listeners: ((e: T) => any)[] = []) {
  const addListener: Event<T> = (listener, thisArgs, disposables) => {
    return useDisposable(event(listener, thisArgs, disposables))
  }

  for (const listener of listeners)
    addListener(listener)

  return addListener
}
