import type { Commands } from '../utils'
import { useCommand } from './useCommand'

/**
 * Register multiple commands. See `vscode::commands.registerCommand`.
 *
 * @category commands
 */
export function useCommands(commands: Partial<Commands>) {
  for (const [command, callback] of Object.entries(commands)) {
    if (callback)
      useCommand(command, callback)
  }
}
