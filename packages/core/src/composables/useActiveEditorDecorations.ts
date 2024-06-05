import type { DecorationOptions, DecorationRenderOptions, Range, TextEditorDecorationType } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { useActiveTextEditor } from './useActiveTextEditor'
import { useEditorDecorations } from './useEditorDecorations'

/**
 * Reactively set decorations on the active editor. See `vscode::window.activeTextEditor`.
 *
 * @category editor
 */
export function useActiveEditorDecorations(
  decorationTypeOrOptions: TextEditorDecorationType | DecorationRenderOptions,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const activeEditor = useActiveTextEditor()

  useEditorDecorations(activeEditor, decorationTypeOrOptions, rangesOrOptions)
}
