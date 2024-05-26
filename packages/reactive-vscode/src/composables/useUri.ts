import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { shallowReactive, toValue } from '@vue/runtime-core'
import type { Uri } from 'vscode'

/**
 * @reactive `Uri`
 */
export function useUri(uri: MaybeRefOrGetter<Uri>) {
  return shallowReactive({
    get scheme() {
      return toValue(uri).scheme
    },
    get authority() {
      return toValue(uri).authority
    },
    get path() {
      return toValue(uri).path
    },
    get query() {
      return toValue(uri).query
    },
    get fragment() {
      return toValue(uri).fragment
    },
    get fsPath() {
      return toValue(uri).fsPath
    },
    with(change) {
      return toValue(uri).with(change)
    },
    toString() {
      return toValue(uri).toString()
    },
    toJSON() {
      return toValue(uri).toJSON()
    },
  } satisfies Uri)
}
