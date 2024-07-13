export interface ScopedConfigKeyTypeMap {
  disabled: boolean
  autoDetection: boolean
  localesPaths: undefined
  encoding: string
}

export const scopedConfigs = {
  scope: 'i18n-ally',
  defaults: {
    disabled: false,
    autoDetection: true,
    localesPaths: undefined,
    encoding: 'utf-8',
    // ...
  },
}

// ...
