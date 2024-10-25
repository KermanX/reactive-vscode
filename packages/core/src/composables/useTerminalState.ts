import type { Terminal } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { computed, shallowRef, toValue, watch } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * @reactive `Terminal.state`
 * @category terminal
 */
export function useTerminalState(terminal: MaybeNullableRefOrGetter<Terminal>) {
  const state = shallowRef(toValue(terminal)?.state)

  watch(terminal, () => {
    state.value = toValue(terminal)?.state
  })

  useDisposable(window.onDidChangeTerminalState((ev) => {
    if (ev === toValue(terminal))
      state.value = ev.state
  }))

  return computed(() => state.value)
}
