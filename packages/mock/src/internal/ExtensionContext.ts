import { resolve } from 'node:path'
import { vi } from 'vitest'
import type vscode from 'vscode'
import { ExtensionKind } from 'vscode'
import { Uri } from '../class/Uri'
import { ExtensionMode } from '../enum/ExtensionMode'
import type { MockVscode } from '../ns'
import { Unimplemented } from '../utils/unimplemented'
import { Memento } from './Memento'
import { SecretStorage } from './SecretStorage'

export function createExtensionContext(_context: MockVscode) {
  const extension: vscode.Extension<any> = {
    id: _context._extention.identifier,
    extensionUri: Uri.file(_context._extention.root),
    extensionPath: _context._extention.root,
    isActive: true,
    packageJSON: _context._extention,
    extensionKind: ExtensionKind.Workspace,
    exports: Unimplemented('TODO'),
    activate: vi.fn(),
  }
  return new (class implements vscode.ExtensionContext {
    _subscriptions: { dispose: () => any }[] = []
    get subscriptions() {
      return this._subscriptions
    }

    _workspaceState = {}
    get workspaceState() {
      return new Memento(() => this._workspaceState)
    }

    _globalState = {}
    get globalState() {
      return new Memento(() => this._globalState)
    }

    secrets = new SecretStorage(_context._config.init.extension.secrets)

    extensionUri = extension.extensionUri

    extensionPath = extension.extensionPath

    environmentVariableCollection = Unimplemented('TODO')

    asAbsolutePath(relativePath: string): string {
      return resolve(_context._extention.root, relativePath)
    }

    storageUri = Unimplemented('TODO')

    storagePath = Unimplemented('TODO')

    globalStorageUri = Unimplemented('TODO')

    globalStoragePath = Unimplemented('TODO')

    logUri = Unimplemented('TODO')

    logPath = Unimplemented('TODO')

    extensionMode = ExtensionMode.Test

    extension = extension
  })()
}

export type ExtensionContext = ReturnType<typeof createExtensionContext>

export const defaultExtensionInitConfig = {
  secrets: {},
}
