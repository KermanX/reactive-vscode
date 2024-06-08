import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { extensions } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `extensions.all`
 */
export const useAllExtensions = createSingletonComposable(() => {
  const allExtensions = shallowRef(extensions.all)

  useDisposable(extensions.onDidChange(() => {
    allExtensions.value = extensions.all
  }))

  return computed(() => allExtensions.value)
})
