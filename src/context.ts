import { effectScope, shallowRef } from '@vue/runtime-core'
import type { ExtensionContext } from 'vscode'

export const context = shallowRef<ExtensionContext | null>(null!)
export const scope = effectScope()
