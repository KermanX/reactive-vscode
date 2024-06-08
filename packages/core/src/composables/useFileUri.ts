import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { toValue } from '@reactive-vscode/reactivity'
import { Uri } from 'vscode'
import { useUri } from './useUri'

/**
 * @reactive `Uri.file`
 * @category utilities
 */
export function useFileUri(path: MaybeRefOrGetter<string>) {
  return useUri(() => Uri.file(toValue(path)))
}
