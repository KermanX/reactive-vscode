import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.terminals`
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
