import { watchEffect } from '@vue/runtime-core'
import { createExtension, createLogger, useCommand, useIsDarkTheme } from 'reactive-vscode'
import { window } from 'vscode'

const useLogger = createLogger('Reactive VSCode')

const { activate, deactivate } = createExtension(() => {
  const logger = useLogger()
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

export { activate, deactivate }
