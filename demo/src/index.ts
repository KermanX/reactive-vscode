import { defineConfigs, defineExtension, useCommand, useIsDarkTheme, useLogger, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

const logger = useLogger('Reactive VSCode')
const { message } = defineConfigs('reactive-vscode-demo', {
  message: 'string',
})

// eslint-disable-next-line no-restricted-syntax
export = defineExtension(() => {
  logger.info('Extension Activated')
  logger.show()

  useCommand('reactive-vscode-demo.helloWorld', () => {
    window.showInformationMessage(message.value)
  })

  const isDark = useIsDarkTheme()
  watchEffect(() => {
    logger.info('Is Dark Theme:', isDark.value)
  })
})
