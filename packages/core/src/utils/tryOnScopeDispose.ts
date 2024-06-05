import { getCurrentScope, onScopeDispose } from '../reactivity'

/**
 * The safe version of `vue::onScopeDispose(https://vuejs.org/api/reactivity-advanced.html#onscopedispose)`.
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
