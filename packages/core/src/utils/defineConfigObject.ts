import type { ShallowReactive } from '@reactive-vscode/reactivity'
import { shallowReactive } from '@reactive-vscode/reactivity'
import type { ConfigurationScope, ConfigurationTarget } from 'vscode'
import type { ConfigTypeOptions, ParseConfigTypeOptions } from './defineConfigs'
import { defineConfigs } from './defineConfigs'
import type { Nullable } from './types'

export type ConfigObject<C extends object> = ShallowReactive<C & {
  /**
   * Write the configuration value to the workspace.
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#WorkspaceConfiguration.update
   */
  $update: (key: keyof C, value: C[keyof C], configurationTarget?: Nullable<ConfigurationTarget>, overrideInLanguage?: boolean) => Promise<void>
}>

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * You can use this function with [vscode-ext-gen](https://github.com/antfu/vscode-ext-gen).
 *
 * @category lifecycle
 */
export function defineConfigObject<const C extends ConfigTypeOptions>(section: string, configs: C, scope?: Nullable<ConfigurationScope>): ConfigObject<ParseConfigTypeOptions<C>>
export function defineConfigObject<C extends object>(section: string, configs: C, scope?: Nullable<ConfigurationScope>): ConfigObject<C>
export function defineConfigObject(section: string, configs: Record<string, unknown>, scope?: Nullable<ConfigurationScope>) {
  const configRefs = defineConfigs(section, configs, scope)

  return shallowReactive({
    ...configRefs,
    $update(key, value, configurationTarget, overrideInLanguage) {
      return configRefs[key].update(value, configurationTarget, overrideInLanguage)
    },
  }) satisfies ConfigObject<typeof configs>
}
