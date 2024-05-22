import { computed, shallowRef } from '@vue/runtime-core'
import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.selection`
 */
export const useTextEditorSelection = createKeyedComposable(
  (textEditor: TextEditor) => {
    const selection = shallowRef(textEditor.selection)

    useDisposable(window.onDidChangeTextEditorSelection((ev) => {
      if (ev.textEditor === textEditor)
        selection.value = ev.selections[0]
    }))

    return computed({
      get() {
        return selection.value
      },
      set(newSelection) {
        selection.value = newSelection
        textEditor.selection = newSelection
      },
    })
  },
  textEditor => textEditor,
)
