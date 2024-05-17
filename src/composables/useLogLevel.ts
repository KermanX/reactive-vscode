import { computed, shallowRef } from '@vue/runtime-core'
import { env } from 'vscode'
import { useDisposable } from './useDisposable'

export function useLogLevel() {
  const logLevel = shallowRef(env.logLevel)

  useDisposable(env.onDidChangeLogLevel((ev) => {
    logLevel.value = ev
  }))

  return computed(() => logLevel.value)
}
