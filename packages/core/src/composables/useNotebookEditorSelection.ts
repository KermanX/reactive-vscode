import { computed } from '@reactive-vscode/reactivity'
import type { NotebookEditor } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useNotebookEditorSelections } from './useNotebookEditorSelections'

/**
 * @reactive `NotebookEditor.selection`
 * @category editor
 */
export function useNotebookEditorSelection(notebookEditor: MaybeNullableRefOrGetter<NotebookEditor>) {
  const selections = useNotebookEditorSelections(notebookEditor)

  return computed({
    get() {
      return selections.value[0]
    },
    set(newSelection) {
      selections.value = selections.value.toSpliced(0, 1, newSelection)
    },
  })
}
