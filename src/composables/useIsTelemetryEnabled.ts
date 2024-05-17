import { computed, shallowRef } from '@vue/runtime-core'
import { env } from 'vscode'
import { useDisposable } from './useDisposable'

export function useIsTelemetryEnabled() {
  const isTelemetryEnabled = shallowRef(env.isTelemetryEnabled)

  useDisposable(env.onDidChangeTelemetryEnabled((ev) => {
    isTelemetryEnabled.value = ev
  }))

  return computed(() => isTelemetryEnabled.value)
}
