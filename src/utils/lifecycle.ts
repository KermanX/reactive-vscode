import { effectScope, shallowRef } from '@vue/runtime-core'
import type { ExtensionContext } from 'vscode'

export const extensionContext = shallowRef<ExtensionContext | null>(null!)
export const extensionScope = effectScope()

type OnActivateCb = (context: ExtensionContext) => void
const activateCbs: OnActivateCb[] = []
export function onActivate(fn: OnActivateCb) {
  if (extensionContext.value)
    fn(extensionContext.value)
  else
    activateCbs.push(fn)
}

type OnDeactivateCb = () => void
const deactivateCbs: OnDeactivateCb[] = []
export function onDeactivate(fn: OnDeactivateCb) {
  deactivateCbs.push(fn)
}

export function createExtension(setup: () => void) {
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
