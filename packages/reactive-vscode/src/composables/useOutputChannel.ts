import { window } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * @reactive `window.createOutputChannel`
 * @category view
 */
export function useOutputChennel(name: string, languageId?: string) {
  return useDisposable(window.createOutputChannel(name, languageId))
}
