import type { ExtensionContext } from 'vscode'
import { ColorThemeKind, window } from 'vscode'

function showMessage() {
  const theme = window.activeColorTheme
  const isDark = theme.kind === ColorThemeKind.Dark || theme.kind === ColorThemeKind.HighContrast
  window.showInformationMessage(`You are using a ${isDark ? 'dark' : 'light'} theme.`)
}

export function activate(extensionContext: ExtensionContext) {
  showMessage()
  extensionContext.subscriptions.push(window.onDidChangeActiveColorTheme(showMessage))
}
