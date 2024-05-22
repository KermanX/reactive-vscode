import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeColorTheme`
 */
export const useActiveColorTheme = createSingletonComposable(() => {
  const result = shallowRef(window.activeColorTheme)

  useDisposable(window.onDidChangeActiveColorTheme((theme) => {
    result.value = theme
  }))

  return result
})
