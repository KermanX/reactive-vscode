import type { ShallowReactive } from '@reactive-vscode/reactivity'
import { shallowReactive } from '@reactive-vscode/reactivity'
import type { ConfigurationScope, ConfigurationTarget } from 'vscode'
import { workspace } from 'vscode'
import { useDisposable } from '../composables'
import { onActivate } from './onActivate'
import type { Nullable } from './types'

type ConfigObject<C extends object> = ShallowReactive<C & {
  $update: (key: keyof C, value: C[keyof C], configurationTarget?: ConfigurationTarget | boolean | null, overrideInLanguage?: boolean) => Promise<void>
}>

/**
 * Define configurations of an extension. See `vscode::workspace.getConfiguration`.
 *
 * You can use this function with [vscode-ext-gen](https://github.com/antfu/vscode-ext-gen).
 *
 * @category lifecycle
 */
export function defineConfigObject<const C extends object>(
  section: string,
  defaults: C,
  scope?: Nullable<ConfigurationScope>,
): ConfigObject<C> {
  const workspaceConfig = workspace.getConfiguration(section, scope)

  const keys = Object.keys(defaults)

  const initialConfigs = Object.fromEntries(
    keys.map((key) => {
      return [key, workspaceConfig.get(key)]
    }),
  ) as C

  const configObject = shallowReactive({
    ...initialConfigs,
    $update: async (key, value, configurationTarget, overrideInLanguage) => {
      configObject[key] = value as any
      await workspaceConfig.update(key as string, value, configurationTarget, overrideInLanguage)
    },
  }) as ConfigObject<C>

  onActivate(() => {
    useDisposable(workspace.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(section))
        return
      const newWorkspaceConfig = workspace.getConfiguration(section)
      for (const key in keys) {
        if (e.affectsConfiguration(`${section}.${key}`))
          configObject[key as keyof C] = newWorkspaceConfig.get(key) as any
      }
    }))
  })

  return configObject
}
