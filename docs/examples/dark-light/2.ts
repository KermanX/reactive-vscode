import { defineExtension, useIsDarkTheme, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

export = defineExtension(() => {
  const isDark = useIsDarkTheme()
  watchEffect(() => {
    window.showInformationMessage(`You are using a ${isDark.value ? 'dark' : 'light'} theme.`)
  })
})
