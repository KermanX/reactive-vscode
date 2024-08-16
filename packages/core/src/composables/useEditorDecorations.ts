import type { MaybeRef, MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { toValue, watchEffect } from '@reactive-vscode/reactivity'
import type { DecorationOptions, DecorationRenderOptions, Range, TextEditor, TextEditorDecorationType } from 'vscode'
import { window } from 'vscode'
import type { Nullable } from '../utils/types'

/**
 * Reactively set decorations on the given editor. See `vscode::TextEditor.setDecorations`.
 *
 * @category editor
 */
export function useEditorDecorations(
  editor: MaybeRefOrGetter<Nullable<TextEditor>>,
  decorationTypeOrOptions: TextEditorDecorationType | DecorationRenderOptions,
  rangesOrOptions: MaybeRef<readonly Range[] | readonly DecorationOptions[]> | ((editor: TextEditor) => readonly Range[] | readonly DecorationOptions[]),
) {
  const decorationType = 'key' in decorationTypeOrOptions
    ? decorationTypeOrOptions
    : window.createTextEditorDecorationType(decorationTypeOrOptions)

  const trigger = () => {
    const _editor = toValue(editor)

    if (_editor) {
      _editor.setDecorations(
        decorationType,
        typeof rangesOrOptions === 'function'
          ? rangesOrOptions(_editor)
          : toValue(rangesOrOptions),
      )
    }
  }

  const stop = watchEffect(trigger)

  return {
    /**
     * Dispose the decoration type.
     */
    dispose() {
      stop()
      decorationType.dispose()
    },
    /**
     * Manually trigger the decoration update.
     */
    trigger,
  }
}
