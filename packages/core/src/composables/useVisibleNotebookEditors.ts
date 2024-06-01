import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.visibleNotebookEditors`
 * @category editor
 */
export const useVisibleNotebookEditors = createSingletonComposable(() => {
  const visibleNotebookEditors = shallowRef(window.visibleNotebookEditors)

  useDisposable(window.onDidChangeVisibleNotebookEditors((ev) => {
    visibleNotebookEditors.value = ev
  }))

  return visibleNotebookEditors
})
