import { shallowRef } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils'
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
