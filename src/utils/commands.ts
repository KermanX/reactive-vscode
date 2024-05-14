import type { Uri } from 'vscode'
import { commands } from 'vscode'

// Extend this interface via declaration merging
export interface Commands extends Record<string, (...args: any[]) => any> {
  'vscode.open': (uri: Uri) => void
}

export function executeCommand<K extends Extract<keyof Commands, string>>(command: K, ...args: Parameters<Commands[K]>) {
  return commands.executeCommand(command, ...args)
}
