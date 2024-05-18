import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

export const useWindowState = createSingletonComposable(() => {
  const windowState = shallowRef(window.state)

  useDisposable(window.onDidChangeWindowState((state) => {
    windowState.value = state
  }))

  return windowState
})
