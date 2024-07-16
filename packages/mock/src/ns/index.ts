import type { RawConfig, ResolvedConfig } from '../options'
import { resolveConfig } from '../options'
import type { VSCodeNS } from '../types'
import type { MockWindow } from './window'
import { createMockWindow } from './window'
import type { MockWorkspace } from './workspace'
import { createMockWorkspace } from './workspace'

export interface MockVscode extends VSCodeNS {
  readonly _config: ResolvedConfig
  window: MockWindow
  workspace: MockWorkspace
}

export function createMockVSCode(config: RawConfig) {
  const resolvedConfig = resolveConfig(config)
  const context = {
    _config: resolvedConfig,
    version: resolvedConfig.version,
  } as MockVscode
  context.window = createMockWindow(context)
  context.workspace = createMockWorkspace(context)
}
