import { defaultWindowInitConfig } from './ns/window'
import { defaultWorkspaceInitConfig } from './ns/workspace'

export const defaultInitConfig = {
  window: defaultWindowInitConfig,
  workspace: defaultWorkspaceInitConfig,
}

type InitConfig = typeof defaultInitConfig

export interface RawConfig {
  version?: string
  init?: {
    [K in keyof InitConfig]?: Partial<InitConfig[K]>
  }
}

export interface ResolvedConfig {
  version: string
  init: typeof defaultInitConfig
}

export function resolveConfig(config: Partial<RawConfig>): ResolvedConfig {
  const initConfig = {} as InitConfig
  for (const key in defaultInitConfig) {
    initConfig[key] = {
      ...defaultInitConfig[key],
      ...config.init?.[key],
    }
  }
  return {
    version: config.version ?? 'mocked',
    init: initConfig,
  }
}
