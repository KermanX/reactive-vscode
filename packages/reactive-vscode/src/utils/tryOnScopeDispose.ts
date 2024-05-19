import { getCurrentScope, onScopeDispose } from '@vue/runtime-core'

export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
