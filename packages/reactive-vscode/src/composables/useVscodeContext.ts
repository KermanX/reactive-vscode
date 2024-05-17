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
export function useVscodeContext<T>(
  name: string,
  value: MaybeRefOrGetter<T>,
  shouldUpdate: MaybeRefOrGetter<boolean> = true,
) {
  watchEffect(() => {
    if (toValue(shouldUpdate))
      commands.executeCommand('setContext', name, toValue(value))
  })
  return computed(() => toValue(value))
}
