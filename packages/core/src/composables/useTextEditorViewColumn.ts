import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { computed, shallowRef, toValue, watch } from '../reactivity'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.viewColumn`
 * @category editor
 */
export function useTextEditorViewColumn(textEditor: MaybeNullableRefOrGetter<TextEditor>) {
  const viewColumn = shallowRef(toValue(textEditor)?.viewColumn)

  watch(textEditor, () => {
    viewColumn.value = toValue(textEditor)?.viewColumn
  })

  useDisposable(window.onDidChangeTextEditorViewColumn((ev) => {
    if (ev.textEditor === toValue(textEditor))
      viewColumn.value = ev.viewColumn
  }))

  return computed(() => viewColumn.value)
}
