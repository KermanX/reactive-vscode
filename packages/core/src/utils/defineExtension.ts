import type { ExtensionContext } from 'vscode'
import { effectScope, shallowRef } from '@reactive-vscode/reactivity'
import { activateCbs } from './onActivate'
import { deactivateCbs } from './onDeactivate'

export const extensionContext = shallowRef<ExtensionContext | null>(null!)

/**
 * @internal
 */
export const extensionScope = effectScope()

/**
 * Define a new extension.
 *
 * @category lifecycle
 */
export function defineExtension<T>(setup: () => T) {
  return {
    activate: (extCtx: ExtensionContext) => {
      extensionContext.value = extCtx
      return extensionScope.run(() => {
        activateCbs.map(fn => fn(extCtx))
        return setup()
      })
    },
    deactivate: () => {
      deactivateCbs.map(fn => fn())
      extensionScope.stop()
    },
  }
}
