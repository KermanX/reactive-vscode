export default (identifier: string, displayName: string) => ({
  extension: `import { defineExtension, useCommand, useIsDarkTheme, useLogger, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'
import { message } from './configs'

const logger = useLogger('${displayName}')

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
`,
  configs: `import { defineConfigs } from 'reactive-vscode'

export const { message } = defineConfigs('${identifier}', {
  message: 'string',
})
`,
})
