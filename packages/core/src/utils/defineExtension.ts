import { effectScope, shallowRef } from '@vue/runtime-core'
import type { ExtensionContext } from 'vscode'
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
export function defineExtension(setup: () => void) {
  return {
    activate: (extCtx: ExtensionContext) => {
      extensionContext.value = extCtx
      extensionScope.run(() => {
        activateCbs.map(fn => fn(extCtx))
        setup()
      })
    },
    deactivate: () => {
      deactivateCbs.map(fn => fn())
      extensionScope.stop()
    },
  }
}
