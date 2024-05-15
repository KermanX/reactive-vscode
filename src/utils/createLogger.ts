import { useOutputChennel } from '../composables/useOutputChannel'
import { createSingletonComposable } from './singletonComposable'

function defaultGetPrefix(type: string) {
  const date = new Date()
  const year = String(date.getFullYear()).padStart(4, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  const millisecond = String(date.getMilliseconds()).padStart(3, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} [${type}] `
}

export function createLogger(name: string, getPrefix = defaultGetPrefix) {
  return createSingletonComposable(() => {
    const outputChannel = useOutputChennel(name)

    const createLoggerFunc = (type: string) => (...message: any[]) => {
      outputChannel.appendLine(getPrefix(type) + message.join(' '))
    }

    return {
      outputChannel,
      createLoggerFunc,
      info: createLoggerFunc('INFO'),
      warn: createLoggerFunc('WARN'),
      error: createLoggerFunc('ERROR'),
      append: outputChannel.append.bind(outputChannel),
      appendLine: outputChannel.appendLine.bind(outputChannel),
      replace: outputChannel.replace.bind(outputChannel),
      clear: outputChannel.clear.bind(outputChannel),
      show: outputChannel.show.bind(outputChannel),
      hide: outputChannel.hide.bind(outputChannel),
    }
  })
}
