import { warn } from './warning'
import { isArray, isFunction, isPromise } from '@vue/shared'
import { LifecycleHooks } from './enums'

// contexts where user provided function may be executed, in addition to
// lifecycle hooks.
export enum ErrorCodes {
  SETUP_FUNCTION,
  RENDER_FUNCTION,
  WATCH_GETTER,
  WATCH_CALLBACK,
  WATCH_CLEANUP,
  NATIVE_EVENT_HANDLER,
  COMPONENT_EVENT_HANDLER,
  VNODE_HOOK,
  DIRECTIVE_HOOK,
  TRANSITION_HOOK,
  APP_ERROR_HANDLER,
  APP_WARN_HANDLER,
  FUNCTION_REF,
  ASYNC_COMPONENT_LOADER,
  SCHEDULER,
}

export const ErrorTypeStrings: Record<LifecycleHooks | ErrorCodes, string> = {
  [LifecycleHooks.ACTIVATED]: 'activated hook',
  [LifecycleHooks.DEACTIVATED]: 'deactivated hook',
  [ErrorCodes.SETUP_FUNCTION]: 'setup function',
  [ErrorCodes.RENDER_FUNCTION]: 'render function',
  [ErrorCodes.WATCH_GETTER]: 'watcher getter',
  [ErrorCodes.WATCH_CALLBACK]: 'watcher callback',
  [ErrorCodes.WATCH_CLEANUP]: 'watcher cleanup function',
  [ErrorCodes.NATIVE_EVENT_HANDLER]: 'native event handler',
  [ErrorCodes.COMPONENT_EVENT_HANDLER]: 'component event handler',
  [ErrorCodes.VNODE_HOOK]: 'vnode hook',
  [ErrorCodes.DIRECTIVE_HOOK]: 'directive hook',
  [ErrorCodes.TRANSITION_HOOK]: 'transition hook',
  [ErrorCodes.APP_ERROR_HANDLER]: 'app errorHandler',
  [ErrorCodes.APP_WARN_HANDLER]: 'app warnHandler',
  [ErrorCodes.FUNCTION_REF]: 'ref function',
  [ErrorCodes.ASYNC_COMPONENT_LOADER]: 'async component loader',
  [ErrorCodes.SCHEDULER]:
    'scheduler flush. This is likely a Vue internals bug. ' +
    'Please open an issue at https://github.com/vuejs/core .',
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