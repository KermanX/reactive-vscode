import type { TextDocument } from 'vscode'
import { workspace } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { shallowRef, toValue, watchEffect } from '../reactivity'
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
