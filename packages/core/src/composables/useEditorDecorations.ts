import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
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
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const decorationType = 'key' in decorationTypeOrOptions ? decorationTypeOrOptions : window.createTextEditorDecorationType(decorationTypeOrOptions)

  watchEffect(() => {
    toValue(editor)?.setDecorations(decorationType, toValue(rangesOrOptions))
  })
}
