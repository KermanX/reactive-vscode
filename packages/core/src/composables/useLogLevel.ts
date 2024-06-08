import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { env } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `env.logLevel`
 */
export const useLogLevel = createSingletonComposable(() => {
  const logLevel = shallowRef(env.logLevel)

  useDisposable(env.onDidChangeLogLevel((ev) => {
    logLevel.value = ev
  }))

  return computed(() => logLevel.value)
})
