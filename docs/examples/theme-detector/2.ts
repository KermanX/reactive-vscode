import { defineExtension, useActiveColorTheme, useIsDarkTheme, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

export = defineExtension(() => {
  const theme = useActiveColorTheme()
  const isDark = useIsDarkTheme()
  watchEffect(() => {
    window.showInformationMessage(`Your theme is ${theme.value} (kind: ${isDark.value ? 'dark' : 'light'})`)
  })
})
