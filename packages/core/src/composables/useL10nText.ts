import { l10n } from 'vscode'
import type { ComputedRef, MaybeRefOrGetter } from '../reactivity'
import { computed, toRaw, toValue } from '../reactivity'

/**
 * @reactive `l10n.t`
 */
export function useL10nText(message: MaybeRefOrGetter<string>, ...args: Array<MaybeRefOrGetter<string | number | boolean>>): ComputedRef<string>
export function useL10nText(message: MaybeRefOrGetter<string>, args: Record<string, any>): ComputedRef<string>
export function useL10nText(message: MaybeRefOrGetter<string>, ...args: Array<MaybeRefOrGetter<string | number | boolean>> | [Record<string, any>]) {
  return computed(() => {
    return typeof args[0] === 'object'
      ? l10n.t(toValue(message), toRaw(args[0]))
      : l10n.t(toValue(message), ...(args as MaybeRefOrGetter<string | number | boolean>[]).map(toValue))
  })
}
