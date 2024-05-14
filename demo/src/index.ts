import { createExtension, createLogger, useCommand } from 'reactive-vscode'
import { window } from 'vscode'

const useLogger = createLogger('Reactive VSCode')

const { activate, deactivate } = createExtension(() => {
  const logger = useLogger()
  logger.info('Hello World!')
  logger.show()

  useCommand('reactive-vscode-demo.helloWorld', () => {
    window.showInformationMessage('Hello World!')
  })
})

export { activate, deactivate }
