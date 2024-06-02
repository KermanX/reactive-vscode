---
outline: false
---

# Dark & Light Theme Detector

Detects the user's theme type, and show a message accordingly.

<ExampleFunctions :fns="[
  'useIsDarkTheme',
]" />

<ExampleContainer>

```ts
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
```

```ts
import { defineExtension, useIsDarkTheme, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

export = defineExtension(() => {
  const isDark = useIsDarkTheme()
  watchEffect(() => {
    window.showInformationMessage(`You are using a ${isDark.value ? 'dark' : 'light'} theme.`)
  })
})
```

</ExampleContainer>
