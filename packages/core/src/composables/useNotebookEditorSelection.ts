import type { NotebookEditor } from 'vscode'
import { computed } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useNotebookEditorSelections } from './useNotebookEditorSelections'

/**
 * @reactive `NotebookEditor.selection`
 * @category editor
 */
export const useNotebookEditorSelection = createKeyedComposable(
  (notebookEditor: NotebookEditor) => {
    const selections = useNotebookEditorSelections(notebookEditor)

    return computed({
      get() {
        return selections.value[0]
      },
      set(newSelection) {
        selections.value = selections.value.toSpliced(0, 1, newSelection)
      },
    })
  },
  notebookEditor => notebookEditor,
)
