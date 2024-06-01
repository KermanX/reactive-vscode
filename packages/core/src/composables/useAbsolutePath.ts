import type { ComputedRef, MaybeRefOrGetter } from '@vue/runtime-core'
import { computed, toValue } from '@vue/runtime-core'
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
      throw new Error('useAbsolutePath() must be called in extension activation callback.')
    return extCtx?.asAbsolutePath(toValue(relativePath))
  })
}
