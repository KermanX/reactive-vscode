import type { ExtensionContext, FileSystemWatcher, Uri } from 'vscode'
import { commands, window, workspace } from 'vscode'

const watchers = new Map<string, FileSystemWatcher>()

function addPattern(pattern: string) {
  if (!watchers.has(pattern)) {
    const watcher = workspace.createFileSystemWatcher(pattern)
    watcher.onDidChange((uri: Uri) => window.showInformationMessage(`File changed: ${uri}`))
    watchers.set(pattern, watcher)
  }
}

function removePattern(pattern: string) {
  const watcher = watchers.get(pattern)
  if (watcher) {
    watcher.dispose()
    watchers.delete(pattern)
  }
}

export function activate(extensionContext: ExtensionContext) {
  addPattern('src/**/*')
  addPattern('docs/**/*')

  extensionContext.subscriptions.push(
    commands.registerCommand('demo.add-watch-dir', async () => {
      const value = await window.showInputBox({ prompt: 'Enter a glob' })
      if (value)
        addPattern(value)
    }),
    commands.registerCommand('demo.remove-watch-dir', async () => {
      const value = await window.showInputBox({ prompt: 'Enter a glob' })
      if (value)
        removePattern(value)
    }),
  )
}

export function deactivate() {
  for (const watcher of watchers.values()) {
    watcher.dispose()
  }
}
