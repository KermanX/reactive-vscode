import type { MaybeRef, MaybeRefOrGetter, WatchSource } from '@reactive-vscode/reactivity'
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
  triggersOn?: ('effect' | 'documentChanged' | WatchSource)[]

  // TODO: support throttle
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
    triggersOn = ['effect', 'documentChanged'],
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

  for (const watchSource of triggersOn) {
    if (typeof watchSource !== 'string') {
      watch(watchSource, update)
    }
    else if (watchSource === 'effect') {
      watchEffect(update)
    }
    else if (watchSource === 'documentChanged') {
      const text = useDocumentText(() => toValue(editor)?.document)
      watch(text, update)
    }
    else {
      throw new TypeError(`Invalid watch source: ${watchSource}`)
    }
  }

  return {
    /**
     * Manually trigger the decoration update.
     */
    update,
  }
}
