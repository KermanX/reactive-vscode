import type { ExtensionContext } from '../internal/ExtensionContext'
import type { RawConfig, ResolvedConfig } from '../options'
import type { MockWindow } from './window'
import type { MockWorkspace } from './workspace'
import * as classes from '../class'
import * as enums from '../enum'
import { createExtensionContext } from '../internal/ExtensionContext'
import { resolveConfig } from '../options'
import { createMockWindow } from './window'
import { createMockWorkspace } from './workspace'

type ExposedEnums = typeof enums
type ExposedClases = typeof classes

export interface MockVscode extends ExposedEnums, ExposedClases {
  readonly _config: ResolvedConfig
  readonly _extention: {
    manifest: Record<string, any>
    identifier: string
    root: string
  }
  version: string

  _extensionContext: ExtensionContext

  window: MockWindow
  workspace: MockWorkspace
}

export function createMockVSCode(config: RawConfig) {
  const resolvedConfig = resolveConfig(config)
  const context = {
    _config: resolvedConfig,
    _extention: {
      manifest: resolvedConfig.manifest,
      identifier: `${resolvedConfig.manifest.publisher}.${resolvedConfig.manifest.name}`,
      root: resolvedConfig.root,
    },
    version: resolvedConfig.version,

    ...enums,
    ...classes,
  } as MockVscode
  context._extensionContext = createExtensionContext(context)
  context.window = createMockWindow(context)
  context.workspace = createMockWorkspace(context)
  return context
}
