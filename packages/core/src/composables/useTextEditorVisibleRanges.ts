import { computed, shallowRef } from '@vue/runtime-core'
import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextEditor.visibleRanges`
 * @category editor
 */
export const useTextEditorVisibleRanges = createKeyedComposable(
  (textEditor: TextEditor) => {
    const ranges = shallowRef(textEditor.visibleRanges)

    useDisposable(window.onDidChangeTextEditorVisibleRanges((ev) => {
      if (ev.textEditor === textEditor)
        ranges.value = ev.visibleRanges
    }))

    return computed(() => ranges.value)
  },
  textEditor => textEditor,
)
