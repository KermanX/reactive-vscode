import type { TextEditorCommandCallback } from './useTextEditorCommand'
import { useTextEditorCommand } from './useTextEditorCommand'

/**
 * Register multiple text editor commands. See `vscode::commands.registerTextEditorCommand`.
 *
 * @category commands
 */
export function useTextEditorCommands(commands: Record<string, TextEditorCommandCallback>) {
  for (const [command, callback] of Object.entries(commands))
    useTextEditorCommand(command, callback)
}
