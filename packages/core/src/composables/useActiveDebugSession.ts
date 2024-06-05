import { debug } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `debug.activeDebugSession`
 */
export const useActiveDebugSession = createSingletonComposable(() => {
  const session = shallowRef(debug.activeDebugSession)

  useDisposable(debug.onDidChangeActiveDebugSession((ev) => {
    session.value = ev
  }))

  return computed(() => session.value)
})
