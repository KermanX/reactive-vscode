import { effectScope, shallowRef } from '@vue/runtime-core'
import type { ExtensionContext } from 'vscode'

export const context = shallowRef<ExtensionContext | null>(null!)

export function createExtension(setup: () => void) {
  const scope = effectScope()
  return {
    activate: (extCtx: ExtensionContext) => {
      context.value = extCtx
      scope.run(setup)
    },
    deactivate: () => {
      scope.stop()
    },
  }
}

export * from './composables'
export * from './utils'
