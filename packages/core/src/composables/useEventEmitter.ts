import { EventEmitter } from 'vscode'
import { useDisposable } from './useDisposable'
import { useEvent } from './useEvent'

/**
 * @category utilities
 * @reactive `EventEmitter`
 */
export function useEventEmitter<T>(listeners: ((e: T) => any)[] = []) {
  const emitter = useDisposable(new EventEmitter<T>())

  const addListener = useEvent(emitter.event, listeners)

  for (const listener of listeners)
    addListener(listener)

  return {
    event: emitter.event,
    fire: emitter.fire.bind(emitter),
    addListener,
  }
}
