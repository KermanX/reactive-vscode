import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watchEffect } from '@vue/runtime-core'
import type { DecorationOptions, DecorationRenderOptions, Range, TextEditor } from 'vscode'
import { window } from 'vscode'
import type { Nullable } from '../utils/types'

export function useEditorDecorations(
  options: DecorationRenderOptions,
  editor: MaybeRefOrGetter<Nullable<TextEditor>>,
  rangesOrOptions: MaybeRefOrGetter<readonly Range[] | readonly DecorationOptions[]>,
) {
  const decorationType = window.createTextEditorDecorationType(options)
  watchEffect(() => {
    toValue(editor)?.setDecorations(decorationType, toValue(rangesOrOptions))
  })
}
