import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeNotebookEditor`
 */
export const useActiveNotebookEditor = createSingletonComposable(() => {
  const activeNotebookEditor = shallowRef(window.activeNotebookEditor)

  useDisposable(window.onDidChangeActiveNotebookEditor((editor) => {
    activeNotebookEditor.value = editor
  }))

  return activeNotebookEditor
})
