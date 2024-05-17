import { computed, shallowRef } from '@vue/runtime-core'
import { env } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

export const useLogLevel = createSingletonComposable(() => {
  const logLevel = shallowRef(env.logLevel)

  useDisposable(env.onDidChangeLogLevel((ev) => {
    logLevel.value = ev
  }))

  return computed(() => logLevel.value)
})
