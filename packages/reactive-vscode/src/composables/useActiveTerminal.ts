import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeTerminal`
 */
export const useActiveTerminal = createSingletonComposable(() => {
  const activeTerminal = shallowRef(window.activeTerminal)

  useDisposable(window.onDidChangeActiveTerminal((terminal) => {
    activeTerminal.value = terminal
  }))

  return activeTerminal
})
