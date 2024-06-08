import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { computed } from '@reactive-vscode/reactivity'
import type { TextEditor, TextEditorSelectionChangeKind } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useTextEditorSelections } from './useTextEditorSelections'

/**
 * @reactive `TextEditor.selection`
 * @category editor
 */
export function useTextEditorSelection(textEditor: MaybeNullableRefOrGetter<TextEditor>, acceptKind?: MaybeRefOrGetter<(TextEditorSelectionChangeKind | undefined)[]>) {
  const selections = useTextEditorSelections(textEditor, acceptKind)

  return computed({
    get() {
      return selections.value[0]
    },
    set(newSelection) {
      selections.value = selections.value.toSpliced(0, 1, newSelection)
    },
  })
}
