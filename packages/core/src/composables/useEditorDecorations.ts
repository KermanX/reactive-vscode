import type { MaybeRef, MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { toValue, watch, watchEffect } from '@reactive-vscode/reactivity'
import type { DecorationOptions, DecorationRenderOptions, Range, TextEditor, TextEditorDecorationType } from 'vscode'
import { window } from 'vscode'
import type { Awaitable, Nullable } from '../utils/types'
import { useDisposable } from './useDisposable'
import { useDocumentText } from './useDocumentText'

export interface UseEditorDecorationsOptions {
  /**
   * The triggers to update the decorations.
   *
   * @default ['effect', 'documentChanged']
   */
  updateOn?: ('effect' | 'documentChanged')[]
}

/**
 * Reactively set decorations on the given editor. See `vscode::TextEditor.setDecorations`.
 *
 * @category editor
 */
export function useEditorDecorations(
  editor: MaybeRefOrGetter<Nullable<TextEditor>>,
  decorationTypeOrOptions: TextEditorDecorationType | DecorationRenderOptions,
  decorations:
    | MaybeRef<readonly Range[] | readonly DecorationOptions[]>
    | ((editor: TextEditor) => Awaitable<readonly Range[] | readonly DecorationOptions[]>),
  options: UseEditorDecorationsOptions = {},
) {
  const {
    updateOn = ['effect', 'documentChanged'],
  } = options

  const decorationType = 'key' in decorationTypeOrOptions
    ? decorationTypeOrOptions
    : useDisposable(window.createTextEditorDecorationType(decorationTypeOrOptions))

  const update = async () => {
    const editorValue = toValue(editor)
    if (!editorValue)
      return

    editorValue.setDecorations(
      decorationType,
      typeof decorations === 'function'
        ? await decorations(editorValue)
        : toValue(decorations),
    )
  }

  const documentText = updateOn.includes('documentChanged')
    ? useDocumentText(() => toValue(editor)?.document)
    : null

  if (updateOn.includes('effect')) {
    watchEffect(async () => {
      void documentText?.value
      await update()
    })
  }
  else if (documentText) {
    watch(documentText, update)
  }

  return {
    /**
     * Manually trigger the decoration update.
     */
    update,
  }
}
