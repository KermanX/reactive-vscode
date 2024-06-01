import type { Event } from 'vscode'

/**
 * @category utilities
 * @reactive `Event`
 */
export function useEvent<T>(event: Event<T>, listeners: ((e: T) => any)[] = []) {
  const addListener: Event<T> = (listener, thisArgs, disposables) => {
    return event(listener, thisArgs, disposables)
  }

  for (const listener of listeners)
    addListener(listener)

  return addListener
}
