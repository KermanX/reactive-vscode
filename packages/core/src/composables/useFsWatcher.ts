import type { GlobPattern } from 'vscode'
import { workspace } from 'vscode'
import { useDisposable } from './useDisposable'
import { useEvent } from './useEvent'

/**
 * @reactive `workspace.createFileSystemWatcher`
 */
export function useFsWatcher(globPattern: GlobPattern, ignoreCreateEvents?: boolean | undefined, ignoreChangeEvents?: boolean | undefined, ignoreDeleteEvents?: boolean | undefined) {
  const watcher = useDisposable(workspace.createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents))

  return {
    ...watcher,
    onDidCreate: useEvent(watcher.onDidCreate),
    onDidChange: useEvent(watcher.onDidChange),
    onDidDelete: useEvent(watcher.onDidDelete),
  }
}
