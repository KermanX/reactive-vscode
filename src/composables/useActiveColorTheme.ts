import { computed, shallowRef } from '@vue/runtime-core'
import { ColorThemeKind, window } from 'vscode'
import { useDisposable } from './useDisposable'

export function useActiveColorTheme() {
  const result = shallowRef(window.activeColorTheme)
  useDisposable(window.onDidChangeActiveColorTheme(theme => (result.value = theme)))
  return result
}

export function useIsDarkTheme() {
  const theme = useActiveColorTheme()
  return computed(() => theme.value.kind === ColorThemeKind.Dark || theme.value.kind === ColorThemeKind.HighContrast)
}
