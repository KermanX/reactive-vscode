import { computed, shallowRef } from '@vue/runtime-core'
import type { NotebookEditor } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

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
