import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { TextEditor, TextEditorSelectionChangeKind } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { computed, shallowRef, toValue, watch } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
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
