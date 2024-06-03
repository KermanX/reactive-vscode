import type { ExtensionContext } from 'vscode'
import { ColorThemeKind, window } from 'vscode'

function showMessage() {
  const theme = window.activeColorTheme
  const isDark = theme.kind === ColorThemeKind.Dark || theme.kind === ColorThemeKind.HighContrast
  window.showInformationMessage(`Your theme is ${theme} (kind: ${isDark ? 'dark' : 'light'})`)
}

export function activate(extensionContext: ExtensionContext) {
  showMessage()
  extensionContext.subscriptions.push(window.onDidChangeActiveColorTheme(showMessage))
}
