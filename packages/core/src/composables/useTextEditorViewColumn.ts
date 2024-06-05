import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.viewColumn`
 * @category editor
 */
export const useTextEditorViewColumn = createKeyedComposable(
  (textEditor: TextEditor) => {
    const viewColumn = shallowRef(textEditor.viewColumn)

    useDisposable(window.onDidChangeTextEditorViewColumn((ev) => {
      if (ev.textEditor === textEditor)
        viewColumn.value = ev.viewColumn
    }))

    return computed(() => viewColumn.value)
  },
  textEditor => textEditor,
)
