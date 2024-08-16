import { defaultExtensionInitConfig } from './internal/ExtensionContext'
import { defaultWindowInitConfig } from './ns/window'
import { defaultWorkspaceInitConfig } from './ns/workspace'

export const defaultInitConfig = {
  extension: defaultExtensionInitConfig,
  window: defaultWindowInitConfig,
  workspace: defaultWorkspaceInitConfig,
}

type InitConfig = typeof defaultInitConfig

export interface RawConfig {
  manifest: Record<string, any>
  root: string
  version?: string
  init?: {
    [K in keyof InitConfig]?: Partial<InitConfig[K]>
  }
}

export interface ResolvedConfig {
  manifest: Record<string, any>
  root: string
  version: string
  init: typeof defaultInitConfig
}

export function resolveConfig(config: RawConfig): ResolvedConfig {
  const initConfig = {} as InitConfig
  for (const key of Object.keys(defaultInitConfig) as (keyof InitConfig)[]) {
    initConfig[key] = {
      ...defaultInitConfig[key],
      ...config.init?.[key],
    } as any
  }
  return {
    manifest: config.manifest,
    root: config.root,
    version: config.version ?? 'mocked',
    init: initConfig,
  }
}
