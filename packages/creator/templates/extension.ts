export default (identifier: string, displayName: string) => `import { defineConfigs, defineExtension, useCommand, useIsDarkTheme, useLogger, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

const logger = useLogger('${displayName}')

const { message } = defineConfigs('${identifier}', {
  message: String,
})

export = defineExtension(() => {
  logger.info('Extension Activated')

  useCommand('${identifier}.helloWorld', () => {
    window.showInformationMessage(message.value)
  })

  const isDark = useIsDarkTheme()
  watchEffect(() => {
    logger.info('Is Dark Theme:', isDark.value)
  })
})
`
