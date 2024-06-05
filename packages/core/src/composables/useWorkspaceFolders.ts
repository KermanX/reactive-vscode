import { workspace } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `workspace.workspaceFolders`
 */
export const useWorkspaceFolders = createSingletonComposable(() => {
  const folders = shallowRef(workspace.workspaceFolders)

  useDisposable(workspace.onDidChangeWorkspaceFolders(() => {
    folders.value = workspace.workspaceFolders
  }))

  return computed(() => folders.value)
})
