import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `NotebookEditor.selection`
 * @category editor
 */
export const useNotebookEditorSelection = createKeyedComposable(
  (notebookEditor: NotebookEditor) => {
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
  },
  notebookEditor => notebookEditor,
)
