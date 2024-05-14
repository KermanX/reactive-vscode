import { window } from 'vscode'
import { useDisposable } from './useDisposable'

export function useOutputChennel(name: string, languageId?: string) {
  return useDisposable(window.createOutputChannel(name, languageId))
}
