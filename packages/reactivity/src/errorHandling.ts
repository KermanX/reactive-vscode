import { warn } from './warning'
import { isArray, isFunction, isPromise } from '@vue/shared'
import { LifecycleHooks } from './enums'

// contexts where user provided function may be executed, in addition to
// lifecycle hooks.
export enum ErrorCodes {
  WATCH_GETTER,
  WATCH_CALLBACK,
  WATCH_CLEANUP,
  APP_ERROR_HANDLER,
  SCHEDULER,
}

export const ErrorTypeStrings: Record<LifecycleHooks | ErrorCodes, string> = {
  [LifecycleHooks.ACTIVATED]: 'activated hook',
  [LifecycleHooks.DEACTIVATED]: 'deactivated hook',
  [ErrorCodes.WATCH_GETTER]: 'watcher getter',
  [ErrorCodes.WATCH_CALLBACK]: 'watcher callback',
  [ErrorCodes.WATCH_CLEANUP]: 'watcher cleanup function',
  [ErrorCodes.APP_ERROR_HANDLER]: 'app errorHandler',
  [ErrorCodes.SCHEDULER]: 'scheduler flush',
}

export type ErrorTypes = LifecycleHooks | ErrorCodes

export function callWithErrorHandling(
  fn: Function,
  instance: null,
  type: ErrorTypes,
  args?: unknown[],
) {
  try {
    return args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
}

export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  instance: null,
  type: ErrorTypes,
  args?: unknown[],
): any {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args)
    if (res && isPromise(res)) {
      res.catch(err => {
        handleError(err, instance, type)
      })
    }
    return res
  }

  if (isArray(fn)) {
    const values = []
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args))
    }
    return values
  } else if (__DEV__) {
    warn(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`,
    )
  }
}

export function handleError(
  err: unknown,
  instance: null,
  type: ErrorTypes,
  throwInDev = true,
) {
  const contextVNode = null
  logError(err, type, contextVNode, throwInDev)
}

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: null,
  throwInDev = true,
) {
  if (__DEV__) {
    const info = ErrorTypeStrings[type]
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`)
    // crash in dev by default so it's more noticeable
    if (throwInDev) {
      throw err
    } else {
      console.error(err)
    }
  } else {
    // recover in prod to reduce the impact on end-user
    console.error(err)
  }
}