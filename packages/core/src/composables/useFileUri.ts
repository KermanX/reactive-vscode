import { Uri } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { toValue } from '../reactivity'
import { useUri } from './useUri'

/**
 * @reactive `Uri.file`
 * @category utilities
 */
export function useFileUri(path: MaybeRefOrGetter<string>) {
  return useUri(() => Uri.file(toValue(path)))
}
