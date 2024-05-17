import { commands } from 'vscode'
import type { Commands } from '../utils/commands'
import { useDisposable } from './useDisposable'

export function useTextEditorCommand<K extends Extract<keyof Commands, string>>(command: K, callback: Commands[K]) {
  useDisposable(commands.registerTextEditorCommand(command, callback))
}

export function useTextEditorCommands(commands: Commands) {
  for (const [command, callback] of Object.entries(commands))
    useTextEditorCommand(command, callback)
}
