import type { Ref } from '@reactive-vscode/reactivity'
import { ref, watch } from '@reactive-vscode/reactivity'
import { extensionContext } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * Get a reactive secret value from the extension's secrets.
 *
 * @reactive `ExtensionContext.secrets`
 * @category extension
 */
export async function useExtensionSecret(key: string) {
  const secrets = extensionContext.value!.secrets

  const value = ref(await secrets.get(key)) as Ref<string | undefined> & {
    set: (newValue: string) => Promise<void>
    remove: () => Promise<void>
  }

  value.set = async (newValue: string) => {
    value.value = newValue
    await secrets.store(key, newValue)
  }

  value.remove = async () => {
    value.value = undefined
    await secrets.delete(key)
  }

  useDisposable(secrets.onDidChange(async (ev) => {
    if (ev.key === key)
      value.value = await secrets.get(key)
  }))

  watch(value, (newValue) => {
    if (newValue === undefined)
      secrets.delete(key)
    else
      secrets.store(key, newValue)
  })

  return value
}
