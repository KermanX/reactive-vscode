import { computed, shallowRef } from '@vue/runtime-core'
import { env } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `env.isTelemetryEnabled`
 */
export const useIsTelemetryEnabled = createSingletonComposable(() => {
  const isTelemetryEnabled = shallowRef(env.isTelemetryEnabled)

  useDisposable(env.onDidChangeTelemetryEnabled((ev) => {
    isTelemetryEnabled.value = ev
  }))

  return computed(() => isTelemetryEnabled.value)
})
