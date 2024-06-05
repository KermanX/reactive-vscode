import { window } from 'vscode'
import { shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.terminals`
 * @category terminal
 */
export const useOpenedTerminals = createSingletonComposable(() => {
  const openedTerminals = shallowRef(window.terminals)

  function update() {
    openedTerminals.value = window.terminals
  }

  useDisposable(window.onDidOpenTerminal(update))
  useDisposable(window.onDidCloseTerminal(update))

  return openedTerminals
})
