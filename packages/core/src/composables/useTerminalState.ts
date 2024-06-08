import { computed, shallowRef } from '@reactive-vscode/reactivity'
import type { Terminal } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `Terminal.state`
 * @category terminal
 */
export const useTerminalState = createKeyedComposable(
  (terminal: Terminal) => {
    const state = shallowRef(terminal.state)

    useDisposable(window.onDidChangeTerminalState((ev) => {
      if (ev === terminal)
        state.value = terminal.state
    }))

    return computed(() => state.value)
  },
  terminal => terminal,
)
