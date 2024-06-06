import type { TextEditor, TextEditorSelectionChangeKind } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { computed } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useTextEditorSelections } from './useTextEditorSelections'

/**
 * @reactive `TextEditor.selection`
 * @category editor
 */
export const useTextEditorSelection = createKeyedComposable(
  (textEditor: TextEditor, acceptKind?: MaybeRefOrGetter<(TextEditorSelectionChangeKind | undefined)[]>) => {
    const selections = useTextEditorSelections(textEditor, acceptKind)

    return computed({
      get() {
        return selections.value[0]
      },
      set(newSelection) {
        selections.value = selections.value.toSpliced(0, 1, newSelection)
      },
    })
  },
  textEditor => textEditor,
)
