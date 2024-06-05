import { window } from 'vscode'
import { shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeTerminal`
 * @category terminal
 */
export const useActiveTerminal = createSingletonComposable(() => {
  const activeTerminal = shallowRef(window.activeTerminal)

  useDisposable(window.onDidChangeActiveTerminal((terminal) => {
    activeTerminal.value = terminal
  }))

  return activeTerminal
})
