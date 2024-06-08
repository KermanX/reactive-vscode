import { shallowRef } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.visibleTextEditors`
 * @category editor
 */
export const useVisibleTextEditors = createSingletonComposable(() => {
  const visibleTextEditors = shallowRef(window.visibleTextEditors)

  useDisposable(window.onDidChangeVisibleTextEditors((ev) => {
    visibleTextEditors.value = ev
  }))

  return visibleTextEditors
})
