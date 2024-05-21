import type { MaybeRefOrGetter } from '@vue/runtime-core'
import type { DecorationOptions, DecorationRenderOptions, Range } from 'vscode'
import { useActiveTextEditor } from './useActiveTextEditor'
import { useEditorDecorations } from './useEditorDecorations'

export function useActiveEditorDecorations(
  options: DecorationRenderOptions,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const activeEditor = useActiveTextEditor()

  useEditorDecorations(options, activeEditor, rangesOrOptions)
}
