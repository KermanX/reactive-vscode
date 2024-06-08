import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { shallowReactive, toValue } from '@reactive-vscode/reactivity'
import type { Uri } from 'vscode'

/**
 * @reactive `Uri`
 * @category utilities
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
