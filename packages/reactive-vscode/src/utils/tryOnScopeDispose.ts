import { getCurrentScope, onScopeDispose } from '@vue/runtime-core'

/**
 * The safe version of `onScopeDispose`.
 *
 * @category lifecycle
 */
export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
