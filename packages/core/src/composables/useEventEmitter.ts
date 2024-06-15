import type { Event } from 'vscode'
import { EventEmitter } from 'vscode'
import { useDisposable } from './useDisposable'
import { useEvent } from './useEvent'

interface UseEventEmitterReturn<T> {
  event: Event<T>
  fire: (data: T) => void
  addListener: (listener: (e: T) => any) => void
}

/**
 * @category utilities
 * @reactive `EventEmitter`
 */
export function useEventEmitter<T>(eventEmitter?: EventEmitter<T>, listeners?: ((e: T) => any)[]): UseEventEmitterReturn<T>
export function useEventEmitter<T>(listeners?: ((e: T) => any)[]): UseEventEmitterReturn<T>
export function useEventEmitter<T>(eventEmitterOrLlisteners?: EventEmitter<T> | ((e: T) => any)[], listeners2: ((e: T) => any)[] = []) {
  const listeners = Array.isArray(eventEmitterOrLlisteners) ? eventEmitterOrLlisteners : listeners2 ?? []
  const emitter = useDisposable(Array.isArray(eventEmitterOrLlisteners) || eventEmitterOrLlisteners == null ? new EventEmitter<T>() : eventEmitterOrLlisteners)

  const addListener = useEvent(emitter.event, listeners)

  for (const listener of listeners)
    addListener(listener)

  return {
    event: emitter.event,
    fire: emitter.fire.bind(emitter),
    addListener,
  }
}
