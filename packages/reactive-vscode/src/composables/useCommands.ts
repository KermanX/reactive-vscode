import type { Commands } from '../utils'
import { useCommand } from './useCommand'

/**
 * Register multiple commands. See `vscode::commands.registerCommand`.
 *
 * @category commands
 */
export function useCommands(commands: Commands) {
  for (const [command, callback] of Object.entries(commands))
    useCommand(command, callback)
}
