import { shallowRef } from '@vue/runtime-core'
import { window } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.activeTextEditor`
 */
export const useActiveTextEditor = createSingletonComposable(() => {
  const activeTextEditor = shallowRef(window.activeTextEditor)

  useDisposable(window.onDidChangeActiveTextEditor((editor) => {
    activeTextEditor.value = editor
  }))

  return activeTextEditor
})
