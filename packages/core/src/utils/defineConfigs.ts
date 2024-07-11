import type { ShallowRef } from '@reactive-vscode/reactivity'
import { computed, shallowRef } from '@reactive-vscode/reactivity'
import type { ConfigurationScope, ConfigurationTarget, WorkspaceConfiguration } from 'vscode'
import { workspace } from 'vscode'
import { useDisposable } from '../composables'
import { onActivate } from './onActivate'

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

function _createConfigRef<T>(workspaceConfig: WorkspaceConfiguration, key: string, value: T): ConfigRef<T> {
  const data = shallowRef(value)

  async function update(value: T, configurationTarget?: ConfigurationTarget | boolean | null, overrideInLanguage?: boolean) {
    data.value = value
    await workspaceConfig.update(key, value, configurationTarget, overrideInLanguage)
  }

  const ref = computed({
    get() {
      return data.value
    },
    set(v) {
      data.value = v
      update(v)
    },
  }) as unknown as ConfigRef<T>

  ref.update = update

  // @ts-expect-error internal function
  ref._set = (v: T) => {
    data.value = v
  }

  return ref
}

export function createConfigRef<T>(key: string, value: T): ConfigRef<T> {
  const ref = _createConfigRef(workspace.getConfiguration(), key, value)

  onActivate(() => {
    useDisposable(workspace.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(key))
        return
      // @ts-expect-error internal function
      ref._set(workspace.getConfiguration().get(key))
    }))
  })

  return ref
}

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * @category lifecycle
 */
export function defineConfigs<const C extends ConfigTypeOptions>(section: string, configs: C, scope?: ConfigurationScope | null | undefined): ParseConfigTypeOptions<C> {
  const workspaceConfig = workspace.getConfiguration(section, scope)

  const configRefs = Object.fromEntries(
    Object.keys(configs).map((key) => {
      return [key, _createConfigRef(workspaceConfig, key, workspaceConfig.get(key))]
    }),
  ) as ParseConfigTypeOptions<C>

  onActivate(() => {
    useDisposable(workspace.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(section))
        return
      const newWorkspaceConfig = workspace.getConfiguration(section)
      for (const key in configs) {
        if (e.affectsConfiguration(`${section}.${key}`))
          // @ts-expect-error internal function
          configRefs[key]._set(newWorkspaceConfig.get(key))
      }
    }))
  })

  return configRefs
}

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * @category lifecycle
 */
export function defineConfigsWithDefaults<const C extends object>(
  section: string,
  defaults: C,
  scope?: ConfigurationScope | null | undefined,
): { [K in keyof C]: ConfigRef<C[K]> } {
  const workspaceConfig = workspace.getConfiguration(section, scope)

  const configRefs = Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => {
      return [key, _createConfigRef(workspaceConfig, key, value)]
    }),
  ) as { [K in keyof C]: ConfigRef<C[K]> }

  onActivate(() => {
    useDisposable(workspace.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(section))
        return
      const newWorkspaceConfig = workspace.getConfiguration(section)
      for (const key in defaults) {
        if (e.affectsConfiguration(`${section}.${key}`))
          // @ts-expect-error internal function
          configRefs[key]._set(newWorkspaceConfig.get(key))
      }
    }))
  })

  return configRefs
}
