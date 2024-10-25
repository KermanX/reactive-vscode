import type { UnwrapNestedRefs } from '@reactive-vscode/reactivity'
import type { ConfigurationScope, ConfigurationTarget } from 'vscode'
import type { ConfigTypeOptions, ParseConfigTypeOptions } from './defineConfigs'
import type { Nullable } from './types'
import { reactive } from '@reactive-vscode/reactivity'
import { defineConfigs } from './defineConfigs'

export type ConfigObject<C extends object> = UnwrapNestedRefs<C> & {
  /**
   * Write the configuration value to the workspace.
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#WorkspaceConfiguration.update
   */
  $update: (key: keyof C, value: C[keyof C], configurationTarget?: Nullable<ConfigurationTarget>, overrideInLanguage?: boolean) => Promise<void>

  /**
   * Set the value without updating the workspace.
   */
  $set: (key: keyof C, value: C[keyof C]) => void
}

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * You can use this function with [vscode-ext-gen](https://github.com/antfu/vscode-ext-gen).
 *
 * @category lifecycle
 */
export function defineConfigObject<const C extends ConfigTypeOptions>(section: Nullable<string>, configs: C, scope?: Nullable<ConfigurationScope>): ConfigObject<ParseConfigTypeOptions<C>>
export function defineConfigObject<C extends object>(section: Nullable<string>, configs: C, scope?: Nullable<ConfigurationScope>): ConfigObject<C>
export function defineConfigObject(section: Nullable<string>, configs: Record<string, unknown>, scope?: Nullable<ConfigurationScope>) {
  const configRefs = defineConfigs(section, configs, scope)

  return reactive({
    ...configRefs,
    $update(key: string, value: any, configurationTarget: any, overrideInLanguage: any) {
      return configRefs[key].update(value, configurationTarget, overrideInLanguage)
    },
    $set(key: string, value: any) {
      return configRefs[key].set(value)
    },
  }) satisfies ConfigObject<typeof configs>
}
