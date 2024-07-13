import type { WritableComputedRef } from '@reactive-vscode/reactivity'
import { computed, shallowRef } from '@reactive-vscode/reactivity'
import type { ConfigurationScope, ConfigurationTarget } from 'vscode'
import { workspace } from 'vscode'
import { useDisposable } from '../composables'
import { onActivate } from './onActivate'
import type { Nullable } from './types'

export interface ConfigRef<T> extends WritableComputedRef<T> {
  update: (value: T, configurationTarget?: ConfigurationTarget | boolean | null, overrideInLanguage?: boolean) => Promise<void>
}

const ConfigTypeSymbol = Symbol('ConfigType')
export interface ConfigType<T> extends ObjectConstructor {
  [ConfigTypeSymbol]: T
}
type ConfigTypeSingle<T> = typeof String | typeof Number | typeof Boolean | typeof Array | typeof Object | null | ConfigType<T>
type ConfigTypeRaw<T> = ConfigTypeSingle<T> | ConfigTypeSingle<T>[]

/**
 * @internal
 */
export type ConfigTypeOptions = Record<string, ConfigTypeRaw<any>>

type ParseConfigType<C extends ConfigTypeRaw<any>> =
  C extends (infer C1)[] ? (C1 extends ConfigTypeSingle<any> ? ParseConfigType<C1> : never)
    : C extends ConfigType<infer T> ? T : (
      C extends typeof String ? string :
        C extends typeof Number ? number :
          C extends typeof Boolean ? boolean :
            C extends typeof Array ? any[] :
              C extends typeof Object ? Record<string | number, any> :
                C extends null ? null : never
    )

/**
 * @internal
 */
export type ParseConfigTypeOptions<C extends ConfigTypeOptions> = {
  [K in keyof C]: ParseConfigType<C[K]>
}

type ToConfigRefs<C extends object> = {
  [K in keyof C]: ConfigRef<C[K]>
}

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * You can use this function with [vscode-ext-gen](https://github.com/antfu/vscode-ext-gen).
 *
 * @category lifecycle
 */
export function defineConfigs<const C extends ConfigTypeOptions>(section: string, configs: C, scope?: Nullable<ConfigurationScope>): ToConfigRefs<ParseConfigTypeOptions<C>>
export function defineConfigs<C extends object>(section: string, configs: C, scope?: Nullable<ConfigurationScope>): ToConfigRefs<C>
export function defineConfigs(section: string, configs: object, scope?: Nullable<ConfigurationScope>) {
  const workspaceConfig = workspace.getConfiguration(section, scope)

  function createConfigRef<T>(key: string, value: T): ConfigRef<T> {
    const data = shallowRef(value)
    const ref = computed({
      get: () => data.value,
      set: (value) => {
        data.value = value
        workspaceConfig.update(key, value)
      },
    }) as ConfigRef<T>
    ref.update = async (value, configurationTarget, overrideInLanguage) => {
      await workspaceConfig.update(key, value, configurationTarget, overrideInLanguage)
      ref.value = value
    }
    return ref
  }

  const configRefs = Object.fromEntries(
    Object.keys(configs).map((key) => {
      return [key, createConfigRef(key, workspaceConfig.get(key))]
    }),
  )

  onActivate(() => {
    useDisposable(workspace.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(section))
        return
      const newWorkspaceConfig = workspace.getConfiguration(section)
      for (const key in configs) {
        if (e.affectsConfiguration(`${section}.${key}`))
          configRefs[key].value = newWorkspaceConfig.get(key) as any
      }
    }))
  })

  return configRefs
}
