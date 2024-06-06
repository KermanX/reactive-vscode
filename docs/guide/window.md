# Window and Workspace

## Theme

You may want to apply different styles to your extension based on the current theme. Although many of the APIs (like `vscode::TreeItem.iconPath`) have built-in support for dual themes, some don't. You may also want to sync the theme in your webview.

The `reactive::useActiveColorTheme` and `reactive::useIsDrakTheme` composable can be used to get the current theme and whether it's dark or not.

```ts
import { defineExtension, useActiveColorTheme, useIsDarkTheme, watchEffect } from 'reactive-vscode'
import { useDemoWebviewView } from './webviewView'

export = defineExtension(() => {
  const theme = useActiveColorTheme()
  const isDark = useIsDarkTheme()

  const webviewView = useDemoWebviewView()

  watchEffect(() => {
    webviewView.postMessage({
      type: 'updateTheme',
      isDark: isDark.value,
      //         ^?
    })
  })
})
```

## Window State

The `reactive::useWindowState` composable can be used to get the current window state:

- `vscode::WindowState.active` - Whether the window has been interacted with recently. This will change immediately on activity, or after a short time of user inactivity.
- `vscode::WindowState.focused` - Whether the current window is focused.

```ts
import { defineExtension, useWindowState, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const { active: isWindowActive, focused: isWindowFocused } = useWindowState()

  watchEffect(() => {
    console.log('Window is active:', isWindowActive.value)
    console.log('Window is focused:', isWindowFocused.value)
  })
})
```

## Workspace Folders

The `reactive::useWorkspaceFolders` composable can be used to get the workspace folders:

```ts
import { defineExtension, useWorkspaceFolders, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const workspaceFolders = useWorkspaceFolders()

  watchEffect(() => {
    console.log('There are', workspaceFolders.value?.length, 'workspace folders')
  })
})
```
