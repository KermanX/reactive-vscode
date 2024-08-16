import type { MaybeRef, MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { toValue, watchEffect } from '@reactive-vscode/reactivity'
import type { DecorationOptions, DecorationRenderOptions, Disposable, Range, TextEditor, TextEditorDecorationType } from 'vscode'
import { window, workspace } from 'vscode'
import type { Nullable } from '../utils/types'
import { useDisposable, useDisposableFn } from './useDisposable'

export interface UseEditorDecorationsOptions {
  /**
   * The triggers to update the decorations.
   *
   * @default ['effect', 'documentChanged']
   */
  triggersOn?: ('effect' | 'documentChanged')[]

  // TODO: support throttle, debounce?
}

/**
 * Reactively set decorations on the given editor. See `vscode::TextEditor.setDecorations`.
 *
 * @category editor
 */
export function useEditorDecorations(
  editor: MaybeRefOrGetter<Nullable<TextEditor>>,
  decorationTypeOrOptions: TextEditorDecorationType | DecorationRenderOptions,
  // TODO: support async function?
  decorations: MaybeRef<readonly Range[] | readonly DecorationOptions[]> | ((editor: TextEditor) => readonly Range[] | readonly DecorationOptions[]),
  options: UseEditorDecorationsOptions = {},
) {
  const {
    triggersOn = ['effect', 'documentChanged'],
  } = options

  const decorationType = 'key' in decorationTypeOrOptions
    ? decorationTypeOrOptions
    : window.createTextEditorDecorationType(decorationTypeOrOptions)

  useDisposable(decorationType)

  const trigger = () => {
    const _editor = toValue(editor)

    if (_editor) {
      _editor.setDecorations(
        decorationType,
        typeof decorations === 'function'
          ? decorations(_editor)
          : toValue(decorations),
      )
    }
  }

  if (triggersOn.includes('effect')) {
    useDisposableFn(
      watchEffect(trigger),
    )
  }

  if (triggersOn.includes('documentChanged')) {
    useDisposable(workspace.onDidChangeTextDocument((e) => {
      if (e.document === toValue(editor)?.document) {
        trigger()
      }
    }))
  }

  return {
    /**
     * Manually trigger the decoration update.
     */
    trigger,
  }
}
