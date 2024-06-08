import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { env } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `env.shell`
 */
export const useDefaultShell = createSingletonComposable(() => {
  const defaultShell = shallowRef(env.shell)

  useDisposable(env.onDidChangeShell((ev) => {
    defaultShell.value = ev
  }))

  return computed(() => defaultShell.value)
})
