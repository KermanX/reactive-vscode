import type { ComputedRef, MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { computed, toValue } from '@reactive-vscode/reactivity'
import { asAbsolutePath } from '../utils/asAbsolutePath'

/**
 * @category utilities
 * @reactive `ExtensionContext.asAbsolutePath`
 */
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, slient: true): ComputedRef<string | undefined>
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, slient?: false): ComputedRef<string>
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, slient = false) {
  return computed(() => asAbsolutePath(toValue(relativePath), slient))
}
