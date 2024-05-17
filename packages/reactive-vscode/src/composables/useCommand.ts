import { commands } from 'vscode'
import type { Commands } from '../utils/commands'
import { useDisposable } from './useDisposable'

export function useCommand<K extends Extract<keyof Commands, string>>(command: K, callback: Commands[K]) {
  useDisposable(commands.registerCommand(command, callback))
}

export function useCommands(commands: Commands) {
  for (const [command, callback] of Object.entries(commands))
    useCommand(command, callback)
}
