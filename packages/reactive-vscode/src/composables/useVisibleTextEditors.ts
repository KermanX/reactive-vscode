import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useDisposable } from './useDisposable'

export const useVisibleTextEditors = createSingletonComposable(() => {
  const visibleTextEditors = shallowRef(window.visibleTextEditors)

  useDisposable(window.onDidChangeVisibleTextEditors((ev) => {
    visibleTextEditors.value = ev
  }))

  return visibleTextEditors
})
