import type { ShallowRef } from '@reactive-vscode/reactivity'
import { shallowRef } from '@reactive-vscode/reactivity'
import type { ConfigurationScope, ConfigurationTarget } from 'vscode'
import { workspace } from 'vscode'
import { useDisposable } from '../composables'
import { onActivate } from './onActivate'
import type { Nullable } from './types'

export interface ConfigRef<T> extends ShallowRef<T> {
  update: (value: T, configurationTarget?: ConfigurationTarget | boolean | null, overrideInLanguage?: boolean) => Promise<void>
}

const ConfigTypeSymbol = Symbol('ConfigType')
export interface ConfigType<T> extends ObjectConstructor {
  [ConfigTypeSymbol]: T
}
type ConfigTypeSingle<T> = string | typeof String | typeof Number | typeof Boolean | typeof Array | typeof Object | null | ConfigType<T>
type ConfigTypeRaw<T> = ConfigTypeSingle<T> | ConfigTypeSingle<T>[]
type ConfigTypeOptions = Record<string, ConfigTypeRaw<any>>

type ParseConfigType<C extends ConfigTypeRaw<any>> =
  C extends string ? (
    C extends 'string' ? string :
      C extends 'number' ? number :
        C extends 'boolean' ? boolean :
          C extends 'null' ? null :
            C extends 'integer' ? number :
              C extends 'array' ? any[] :
                C extends 'object' ? Record<string | number, any> : never
  )
    : C extends (infer C1)[] ? (C1 extends ConfigTypeSingle<any> ? ParseConfigType<C1> : never)
      : C extends ConfigType<infer T> ? T : (
        C extends typeof String ? string :
          C extends typeof Number ? number :
            C extends typeof Boolean ? boolean :
              C extends typeof Array ? any[] :
                C extends typeof Object ? Record<string | number, any> :
                  C extends null ? null : never
      )
type ParseConfigTypeOptions<C extends ConfigTypeOptions> = {
  [K in keyof C]: ConfigRef<ParseConfigType<C[K]>>
}

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * @category lifecycle
 */
export function defineConfigs<const C extends ConfigTypeOptions>(section: string, configs: C, scope?: Nullable<ConfigurationScope>): ParseConfigTypeOptions<C> {
  const workspaceConfig = workspace.getConfiguration(section, scope)

  function createConfigRef<T>(key: string, value: T): ConfigRef<T> {
    const ref = shallowRef(value) as unknown as ConfigRef<T>
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
  ) as ParseConfigTypeOptions<C>

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
