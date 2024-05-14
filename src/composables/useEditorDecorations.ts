import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watchEffect } from '@vue/runtime-core'
import type { DecorationOptions, DecorationRenderOptions, Range, TextEditor } from 'vscode'
import { window } from 'vscode'
import { useActiveTextEditor } from './useActiveTextEditor'

export function useEditorDecorations(
  options: DecorationRenderOptions,
  editor: MaybeRefOrGetter<TextEditor | null | undefined>,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const decorationType = window.createTextEditorDecorationType(options)
  watchEffect(() => {
    toValue(editor)?.setDecorations(decorationType, toValue(rangesOrOptions))
  })
}

export function useActiveEditorDecorations(
  options: DecorationRenderOptions,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const activeEditor = useActiveTextEditor()
  useEditorDecorations(options, activeEditor, rangesOrOptions)
}
