import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { debug } from 'vscode'
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
