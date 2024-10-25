import type { ExtensionContext } from 'vscode'
import { commands, StatusBarAlignment, window } from 'vscode'

export function activate(extensionContext: ExtensionContext) {
  let counter = 0

  const item = window.createStatusBarItem(StatusBarAlignment.Right, 100)

  function updateStatusBar() {
    item.text = `$(megaphone) Hello*${counter}`
    item.show()
  }

  updateStatusBar()

  extensionContext.subscriptions.push(
    commands.registerCommand('extension.sayHello', () => {
      counter++
      updateStatusBar()
    }),
    commands.registerCommand('extension.sayGoodbye', () => {
      counter--
      updateStatusBar()
    }),
  )
}
