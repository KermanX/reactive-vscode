import { computed, shallowRef } from '@vue/runtime-core'
import { env } from 'vscode'
import { useDisposable } from './useDisposable'

export function useDefaultShell() {
  const defaultShell = shallowRef(env.shell)

  useDisposable(env.onDidChangeShell((ev) => {
    defaultShell.value = ev
  }))

  return computed(() => defaultShell.value)
}
