import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { DocumentSelector, FoldingRangeProvider } from 'vscode'
import { shallowRef, toValue, watchEffect } from '@reactive-vscode/reactivity'
import { EventEmitter, languages } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * @reactive `languages.registerFoldingRangeProvider`
 */
export function useFoldingRangeProvider(
  selector: DocumentSelector,
  provideFoldingRanges: MaybeRefOrGetter<FoldingRangeProvider['provideFoldingRanges']>,
) {
  const changeEventEmitter = new EventEmitter<void>()

  const provideFn = shallowRef<FoldingRangeProvider['provideFoldingRanges']>()

  watchEffect(() => {
    if (provideFn.value)
      changeEventEmitter.fire()
    provideFn.value = toValue(provideFoldingRanges)
  })

  useDisposable(languages.registerFoldingRangeProvider(
    selector,
    {
      onDidChangeFoldingRanges: changeEventEmitter.event,
      provideFoldingRanges(document, context, token) {
        return provideFn.value?.(document, context, token)
      },
    },
  ))
}
