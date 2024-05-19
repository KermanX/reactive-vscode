import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

export const useVisibleNotebookEditors = createSingletonComposable(() => {
  const visibleNotebookEditors = shallowRef(window.visibleNotebookEditors)

  useDisposable(window.onDidChangeVisibleNotebookEditors((ev) => {
    visibleNotebookEditors.value = ev
  }))

  return visibleNotebookEditors
})
