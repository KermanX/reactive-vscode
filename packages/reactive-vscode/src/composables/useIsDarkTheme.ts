import { computed } from '@vue/runtime-core'
import { ColorThemeKind } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useActiveColorTheme } from './useActiveColorTheme'

/**
 * Determines if the current color theme is dark. See {{ColorTheme.kind}}.
 *
 * @category window
 */
export const useIsDarkTheme = createSingletonComposable(() => {
  const theme = useActiveColorTheme()

  return computed(() => theme.value.kind === ColorThemeKind.Dark || theme.value.kind === ColorThemeKind.HighContrast)
})
