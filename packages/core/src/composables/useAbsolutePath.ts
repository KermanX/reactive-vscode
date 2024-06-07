import type { ComputedRef, MaybeRefOrGetter } from '../reactivity'
import { computed, toValue } from '../reactivity'
import { extensionContext } from '../utils'

/**
 * @category utilities
 * @reactive `ExtensionContext.asAbsolutePath`
 */
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, slient: true): ComputedRef<string | undefined>
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, slient?: false): ComputedRef<string>
export function useAbsolutePath(relativePath: MaybeRefOrGetter<string>, slient = false) {
  return computed(() => {
    const extCtx = extensionContext.value
    if (!extCtx && !slient)
      throw new Error('Cannot get absolute path because the extension is not activated yet')
    return extCtx?.asAbsolutePath(toValue(relativePath))
  })
}
