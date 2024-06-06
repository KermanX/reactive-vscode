import type { TextEditor, TextEditorSelectionChangeKind } from 'vscode'
import { window } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { computed, shallowRef, toValue } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.selections`
 * @category editor
 */
export const useTextEditorSelections = createKeyedComposable(
  (textEditor: TextEditor, acceptKind?: MaybeRefOrGetter<(TextEditorSelectionChangeKind | undefined)[]>) => {
    const selections = shallowRef(textEditor.selections)

    useDisposable(window.onDidChangeTextEditorSelection((ev) => {
      const kinds = toValue(acceptKind)
      if (ev.textEditor === textEditor && (!kinds || kinds.includes(ev.kind)))
        selections.value = ev.selections
    }))

    return computed({
      get() {
        return selections.value
      },
      set(newSelections) {
        selections.value = newSelections
        textEditor.selections = newSelections
      },
    })
  },
  textEditor => textEditor,
)
