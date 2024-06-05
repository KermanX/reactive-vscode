import { env } from 'vscode'
import { computed, shallowRef } from '../reactivity'
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
