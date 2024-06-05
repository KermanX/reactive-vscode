import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.selections`
 * @category editor
 */
export const useTextEditorSelections = createKeyedComposable(
  (textEditor: TextEditor) => {
    const selections = shallowRef(textEditor.selections)

    useDisposable(window.onDidChangeTextEditorSelection((ev) => {
      if (ev.textEditor === textEditor)
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
