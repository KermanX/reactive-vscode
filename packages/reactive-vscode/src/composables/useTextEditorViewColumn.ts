import { computed, shallowRef } from '@vue/runtime-core'
import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

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
