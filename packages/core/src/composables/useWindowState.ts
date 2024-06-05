import { window } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.state`
 */
export const useWindowState = createSingletonComposable(() => {
  const windowState = shallowRef(window.state)

  useDisposable(window.onDidChangeWindowState((ev) => {
    windowState.value = ev
  }))

  return {
    focused: computed(() => windowState.value.focused),
    active: computed(() => windowState.value.active),
  }
})
