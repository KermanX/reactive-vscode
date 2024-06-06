import type { TextEditor, TextEditorSelectionChangeKind } from 'vscode'
import { window } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { computed, shallowRef, toValue, watch } from '../reactivity'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.selections`
 * @category editor
 */
export function useTextEditorSelections(textEditor: MaybeNullableRefOrGetter<TextEditor>, acceptKind?: MaybeRefOrGetter<(TextEditorSelectionChangeKind | undefined)[]>) {
  const selections = shallowRef(toValue(textEditor)?.selections ?? [])

  watch(textEditor, () => {
    selections.value = toValue(textEditor)?.selections ?? []
  })

  useDisposable(window.onDidChangeTextEditorSelection((ev) => {
    const editor = toValue(textEditor)
    const kinds = toValue(acceptKind)
    if (ev.textEditor === editor && (!kinds || kinds.includes(ev.kind)))
      selections.value = ev.selections
  }))

  return computed({
    get() {
      return selections.value
    },
    set(newSelections) {
      selections.value = newSelections
      const editor = toValue(textEditor)
      if (editor)
        editor.selections = newSelections
    },
  })
}
