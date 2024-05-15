import { shallowRef } from '@vue/runtime-core'
import type { ExtensionContext } from 'vscode'

export const context = shallowRef<ExtensionContext | null>(null!)

type OnActivateCb = (context: ExtensionContext) => void
const activateCbs: OnActivateCb[] = []
export function onActivate(fn: OnActivateCb) {
  if (context.value)
    fn(context.value)
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
      context.value = extCtx
      activateCbs.map(fn => fn(extCtx))
      setup()
    },
    deactivate: () => {
      deactivateCbs.map(fn => fn())
    },
  }
}
