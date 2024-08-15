import type { ComputedRef, MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { computed, toValue } from '@reactive-vscode/reactivity'
import { asAbsolutePath } from '../utils/asAbsolutePath'

/**
 * @category utilities
 * @reactive `ExtensionContext.asAbsolutePath`
 */
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, silent: true): ComputedRef<string | undefined>
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, silent?: false): ComputedRef<string>
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, silent = false) {
  return computed(() => asAbsolutePath(toValue(relativePath), silent))
}
