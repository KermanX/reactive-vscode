import type { TextEditor } from 'vscode'
import { window } from 'vscode'
import { computed, shallowRef } from '../reactivity'
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
