import type { MaybeRefOrGetter } from '@vue/runtime-core'
import type { DecorationOptions, DecorationRenderOptions, Range } from 'vscode'
import { useActiveTextEditor } from './useActiveTextEditor'
import { useEditorDecorations } from './useEditorDecorations'

/**
 * Reactively set decorations on the active editor. See {{window.activeTextEditor}}.
 *
 * @category decorations
 */
export function useActiveEditorDecorations(
  options: DecorationRenderOptions,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const activeEditor = useActiveTextEditor()

  useEditorDecorations(options, activeEditor, rangesOrOptions)
}
