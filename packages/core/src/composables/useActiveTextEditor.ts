import { window } from 'vscode'
import { shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeTextEditor`
 * @category editor
 */
export const useActiveTextEditor = createSingletonComposable(() => {
  const activeTextEditor = shallowRef(window.activeTextEditor)

  useDisposable(window.onDidChangeActiveTextEditor((editor) => {
    activeTextEditor.value = editor
  }))

  return activeTextEditor
})
