import { computed, shallowRef, toValue, watch } from '@reactive-vscode/reactivity'
import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `NotebookEditor.visibleRanges`
 * @category editor
 */
export function useNotebookEditorVisibleRanges(notebookEditor: MaybeNullableRefOrGetter<NotebookEditor>) {
  const ranges = shallowRef(toValue(notebookEditor)?.visibleRanges ?? [])

  watch(notebookEditor, () => {
    ranges.value = toValue(notebookEditor)?.visibleRanges ?? []
  })

  useDisposable(window.onDidChangeNotebookEditorVisibleRanges((ev) => {
    if (ev.notebookEditor === toValue(notebookEditor))
      ranges.value = ev.visibleRanges
  }))

  return computed(() => ranges.value)
}
