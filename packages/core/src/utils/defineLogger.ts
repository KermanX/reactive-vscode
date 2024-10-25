import type { UseLoggerOptions } from '../composables'
import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { useLogger } from '../composables'
import { onActivate } from './onActivate'

/**
 * Define a logger which is usable before activation.
 *
 * @category view
 */
export function defineLogger(name: string, options?: UseLoggerOptions) {
  type Logger = ReturnType<typeof useLogger>
  const logger = shallowRef<Logger | null>(null)

  const delayedOps: [string, any[]][] = []
  const createDelayedOp = <K extends Exclude<keyof Logger, 'outputChannel'>>(key: K) =>
    (...args: Parameters<Logger[K]>): ReturnType<Logger[K]> | null => {
      if (logger.value) {
        // @ts-expect-error - K is always a literal string
        return logger.value[key](...args)
      }
      else {
        delayedOps.push([key, args])
        return null
      }
    }

  onActivate(() => {
    logger.value = useLogger(name, options)
    for (const [key, args] of delayedOps) {
      // @ts-expect-error - missing types
      logger.value[key](...args)
    }
  })

  return {
    logger,
    outputChannel: computed(() => logger.value?.outputChannel),
    info: createDelayedOp('info'),
    warn: createDelayedOp('warn'),
    error: createDelayedOp('error'),
    append: createDelayedOp('append'),
    appendLine: createDelayedOp('appendLine'),
    replace: createDelayedOp('replace'),
    clear: createDelayedOp('clear'),
    show: createDelayedOp('show'),
    hide: createDelayedOp('hide'),
  }
}
