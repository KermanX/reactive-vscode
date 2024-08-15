import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { computed, toValue } from '@reactive-vscode/reactivity'
import { Uri } from 'vscode'

/**
 * @reactive `Uri.file`
 * @category utilities
 */
export function useFileUri(path: MaybeRefOrGetter<string>) {
  return computed(() => Uri.file(toValue(path)))
}
