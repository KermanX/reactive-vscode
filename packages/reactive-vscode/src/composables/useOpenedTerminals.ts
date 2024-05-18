import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

export const useOpenedTerminals = createSingletonComposable(() => {
  const openedTerminals = shallowRef(window.terminals)

  function update() {
    openedTerminals.value = window.terminals
  }

  useDisposable(window.onDidOpenTerminal(update))
  useDisposable(window.onDidCloseTerminal(update))

  return openedTerminals
})
