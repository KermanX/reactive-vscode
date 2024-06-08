import { computed, shallowRef, toValue, watch } from '@reactive-vscode/reactivity'
import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `NotebookEditor.selections`
 * @category editor
 */
export function useNotebookEditorSelections(notebookEditor: MaybeNullableRefOrGetter<NotebookEditor>) {
  const selections = shallowRef(toValue(notebookEditor)?.selections ?? [])

  watch(notebookEditor, () => {
    selections.value = toValue(notebookEditor)?.selections ?? []
  })

  useDisposable(window.onDidChangeNotebookEditorSelection((ev) => {
    if (ev.notebookEditor === toValue(notebookEditor))
      selections.value = ev.selections
  }))

  return computed({
    get() {
      return selections.value
    },
    set(newSelections) {
      selections.value = newSelections
      const editor = toValue(notebookEditor)
      if (editor)
        editor.selections = newSelections
    },
  })
}
