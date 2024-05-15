import type { ExtensionContext } from 'vscode'
import { context, scope } from './context'

export function createExtension(setup: () => void) {
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
