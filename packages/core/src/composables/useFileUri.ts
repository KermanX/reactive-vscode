import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue } from '@vue/runtime-core'
import { Uri } from 'vscode'
import { useUri } from './useUri'

/**
 * @reactive `Uri.file`
 * @category utilities
 */
export function useFileUri(path: MaybeRefOrGetter<string>) {
  return useUri(() => Uri.file(toValue(path)))
}
