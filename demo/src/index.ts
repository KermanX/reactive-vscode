import { defineExtension, useCommand, useIsDarkTheme, useLogger, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

const logger = useLogger('Reactive VSCode')

// eslint-disable-next-line no-restricted-syntax
export = defineExtension(() => {
  logger.info('Hello World!')
  logger.show()

  useCommand('reactive-vscode-demo.helloWorld', () => {
    window.showInformationMessage('Hello World!')
  })

  const isDark = useIsDarkTheme()
  watchEffect(() => {
    logger.info('Is Dark Theme:', isDark.value)
  })
})
