import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { TextDocument } from 'vscode'
import { shallowRef, toValue, watchEffect } from '@reactive-vscode/reactivity'
import { workspace } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * @reactive `TextDocument.getText`
 * @category document
 */
export function useDocumentText(doc: MaybeRefOrGetter<TextDocument | undefined>) {
  const text = shallowRef(toValue(doc)?.getText())

  watchEffect(() => {
    text.value = toValue(doc)?.getText()
  })

  useDisposable(workspace.onDidChangeTextDocument((ev) => {
    if (ev.document === toValue(doc))
      text.value = ev.document.getText()
  }))

  return text
}
