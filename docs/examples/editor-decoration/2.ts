import type { ExtensionContext } from 'vscode'
import { window, workspace } from 'vscode'

const decorationType = window.createTextEditorDecorationType({
  backgroundColor: 'red',
})

function updateDecorations(enabled: boolean) {
  window.activeTextEditor?.setDecorations(
    decorationType,
    enabled ? [/* ... Caclulated ranges ... */] : [],
  )
}

export function activate(context: ExtensionContext) {
  const configurations = workspace.getConfiguration('demo')
  let decorationsEnabled = configurations.get<boolean>('decorations')!

  context.subscriptions.push(workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration('demo.decorations')) {
      decorationsEnabled = configurations.get<boolean>('decorations')!
      updateDecorations(decorationsEnabled)
    }
  }))
  context.subscriptions.push(window.onDidChangeActiveTextEditor(() => {
    updateDecorations(decorationsEnabled)
  }))

  updateDecorations(decorationsEnabled)
}
