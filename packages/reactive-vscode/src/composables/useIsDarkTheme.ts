import { computed } from '@vue/runtime-core'
import { ColorThemeKind } from 'vscode'
import { createSingletonComposable } from '../utils/singletonComposable'
import { useActiveColorTheme } from './useActiveColorTheme'

export const useIsDarkTheme = createSingletonComposable(() => {
  const theme = useActiveColorTheme()

  return computed(() => theme.value.kind === ColorThemeKind.Dark || theme.value.kind === ColorThemeKind.HighContrast)
})
