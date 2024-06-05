import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `NotebookEditor.visibleRanges`
 * @category editor
 */
export const useNotebookEditorVisibleRanges = createKeyedComposable(
  (notebookEditor: NotebookEditor) => {
    const ranges = shallowRef(notebookEditor.visibleRanges)

    useDisposable(window.onDidChangeNotebookEditorVisibleRanges((ev) => {
      if (ev.notebookEditor === notebookEditor)
        ranges.value = ev.visibleRanges
    }))

    return computed(() => ranges.value)
  },
  notebookEditor => notebookEditor,
)
