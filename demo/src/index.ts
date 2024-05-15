import { watchEffect } from '@vue/runtime-core'
import { createExtension, useCommand, useIsDarkTheme, useLogger } from 'reactive-vscode'
import { window } from 'vscode'

const logger = useLogger('Reactive VSCode')

const { activate, deactivate } = createExtension(() => {
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
