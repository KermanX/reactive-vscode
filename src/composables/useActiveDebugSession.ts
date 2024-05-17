import { computed, shallowRef } from '@vue/runtime-core'
import { debug } from 'vscode'
import { useDisposable } from './useDisposable'

export function useActiveDebugSession() {
  const session = shallowRef(debug.activeDebugSession)

  useDisposable(debug.onDidChangeActiveDebugSession((ev) => {
    session.value = ev
  }))

  return computed(() => session.value)
}
