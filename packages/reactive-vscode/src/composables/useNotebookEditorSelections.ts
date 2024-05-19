import { computed, shallowRef } from '@vue/runtime-core'
import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

export const useNotebookEditorSelections = createKeyedComposable(
  (notebookEditor: NotebookEditor) => {
    const selections = shallowRef(notebookEditor.selections)

    useDisposable(window.onDidChangeNotebookEditorSelection((ev) => {
      if (ev.notebookEditor === notebookEditor)
        selections.value = ev.selections
    }))

    return computed({
      get() {
        return selections.value
      },
      set(newSelections) {
        selections.value = newSelections
        notebookEditor.selections = newSelections
      },
    })
  },
  notebookEditor => notebookEditor,
)
