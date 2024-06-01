import { commands } from 'vscode'
import type { Commands } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * Register a command. See `vscode::commands.registerCommand`.
 *
 * @category commands
 */
export function useCommand<K extends Extract<keyof Commands, string>>(command: K, callback: Commands[K]) {
  useDisposable(commands.registerCommand(command, callback))
}
