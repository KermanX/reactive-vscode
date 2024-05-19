import { computed, shallowRef } from '@vue/runtime-core'
import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import { useDisposable } from './useDisposable'

export function useNotebookEditorSelection(notebookEditor: NotebookEditor) {
  const selection = shallowRef(notebookEditor.selection)

  useDisposable(window.onDidChangeNotebookEditorSelection((ev) => {
    if (ev.notebookEditor === notebookEditor)
      selection.value = ev.selections[0]
  }))

  return computed({
    get() {
      return selection.value
    },
    set(newSelection) {
      selection.value = newSelection
      notebookEditor.selection = newSelection
    },
  })
}
