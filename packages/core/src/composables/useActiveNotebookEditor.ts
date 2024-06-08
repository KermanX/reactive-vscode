import { shallowRef } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeNotebookEditor`
 * @category editor
 */
export const useActiveNotebookEditor = createSingletonComposable(() => {
  const activeNotebookEditor = shallowRef(window.activeNotebookEditor)

  useDisposable(window.onDidChangeActiveNotebookEditor((editor) => {
    activeNotebookEditor.value = editor
  }))

  return activeNotebookEditor
})
