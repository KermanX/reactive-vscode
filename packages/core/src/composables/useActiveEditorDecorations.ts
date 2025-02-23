import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { DecorationOptions, DecorationRenderOptions, Range, TextEditorDecorationType } from 'vscode'
import { useActiveTextEditor } from './useActiveTextEditor'
import { useEditorDecorations } from './useEditorDecorations'

/**
 * Reactively set decorations on the active editor. See `vscode::window.activeTextEditor`.
 *
 * @category editor
 */
export function useActiveEditorDecorations(
  decorationTypeOrOptions: MaybeRefOrGetter<TextEditorDecorationType | DecorationRenderOptions>,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const activeEditor = useActiveTextEditor()

  useEditorDecorations(activeEditor, decorationTypeOrOptions, rangesOrOptions)
}
