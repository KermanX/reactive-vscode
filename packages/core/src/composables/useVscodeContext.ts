import type { ComputedRef, MaybeRefOrGetter, Ref, WritableComputedRef } from '@vue/runtime-core'
import { computed, toValue, watchEffect } from '@vue/runtime-core'
import { commands } from 'vscode'

export function useVscodeContext<T>(
  name: string,
  value: ComputedRef<T> | (() => T),
  shouldUpdate?: MaybeRefOrGetter<boolean>,
): ComputedRef<T>
export function useVscodeContext<T>(
  name: string,
  value: WritableComputedRef<T>,
  shouldUpdate?: MaybeRefOrGetter<boolean>,
): WritableComputedRef<T>
export function useVscodeContext<T>(
  name: string,
  value: Ref<T>,
  shouldUpdate?: MaybeRefOrGetter<boolean>,
): Ref<T>

/**
 * Reactively set a VS Code context. See [custom when clause context](https://code.visualstudio.com/api/references/when-clause-contexts#add-a-custom-when-clause-context).
 *
 * @category lifecycle
 */
export function useVscodeContext<T>(
  name: string,
  value: Ref<T> | (() => T),
  shouldUpdate: MaybeRefOrGetter<boolean> = true,
) {
  const normalized = typeof value === 'function' ? computed(value) : value
  watchEffect(() => {
    if (toValue(shouldUpdate))
      commands.executeCommand('setContext', name, normalized.value)
  })
  return normalized
}
