import { vi } from 'vitest'
import type vscode from 'vscode'
import { EventEmitter } from '../class/EventEmitter'
import { Uri } from '../class/Uri'
import type { WorkspaceNS } from '../types'
import { Unimplemented } from '../utils/unimplemented'
import { TextDocument } from '../internal/TextDocument'
import { TextDocumentSaveReason } from '../enum/TextDocumentSaveReason'
import type { MockVscode } from '.'

export function createMockWorkspace(_context: MockVscode) {
  const _init = _context._config.init.workspace

  return new (class implements WorkspaceNS {
    _workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined = _init.workspaceFolders
    _onDidChangeWorkspaceFolders = new EventEmitter<vscode.WorkspaceFoldersChangeEvent>()
    onDidChangeWorkspaceFolders = this._onDidChangeWorkspaceFolders.event
    get workspaceFolders(): readonly vscode.WorkspaceFolder[] | undefined {
      return this._workspaceFolders
    }

    get rootPath() {
      return this.workspaceFolders?.[0]?.uri.fsPath
    }

    get name() {
      return this.workspaceFolders?.[0]?.name
    }

    get workspaceFile() {
      return Uri.from({
        scheme: 'untitled',
        path: 'mocked.code-workspace',
      })
    }

    getWorkspaceFolder = vi.fn((_uri: Uri): vscode.WorkspaceFolder | undefined => {
      return Unimplemented('WorkspaceFolder')
    })

    asRelativePath = vi.fn((_pathOrUri: string | Uri, _includeWorkspaceFolder?: boolean): string => {
      return Unimplemented('RelativePath')
    })

    updateWorkspaceFolders = vi.fn((start: number, deleteCount: number | undefined | null, ...workspaceFoldersToAdd: {
      readonly uri: Uri
      readonly name?: string
    }[]): boolean => {
      const added = workspaceFoldersToAdd.map((w, i) => {
        return {
          uri: w.uri,
          name: w.name ?? w.uri.fsPath.split('/').pop() ?? w.uri.fsPath,
          index: start + i,
        }
      })
      this._workspaceFolders ??= []
      this._workspaceFolders = this._workspaceFolders?.toSpliced(start, deleteCount ?? 0, ...added)
      this._onDidChangeWorkspaceFolders.fire({
        added,
        removed: this._workspaceFolders?.slice(start, start + (deleteCount ?? 0)) ?? [],
      })
      return true
    })

    createFileSystemWatcher = vi.fn((_globPattern: vscode.GlobPattern, _ignoreCreateEvents?: boolean, _ignoreChangeEvents?: boolean, _ignoreDeleteEvents?: boolean): vscode.FileSystemWatcher => {
      return Unimplemented('FileSystemWatcher')
    })

    findFiles = vi.fn((_include: vscode.GlobPattern, _exclude?: vscode.GlobPattern | null, _maxResults?: number, _token?: vscode.CancellationToken): Thenable<Uri[]> => {
      return Unimplemented('findFiles')
    })

    save = vi.fn(async (uri: Uri): Promise<Uri | undefined> => {
      const document = this._getTextDocumentFromUri(uri)
      if (!document)
        throw new Error('Cannot save text document: Text document not opened')
      const editsPromises: (Thenable<readonly vscode.TextEdit[]> | Thenable<any>)[] = []
      this._onWillSaveTextDocument.fire({
        document,
        reason: TextDocumentSaveReason.Manual,
        waitUntil(e) {
          editsPromises.push(e)
        },
      })
      const edits = (await Promise.all(editsPromises)).fill((edits: any) => Array.isArray(edits))
      edits.forEach(edit => document._applyEdit(edit))
      document._dirty = false
      this._onDidSaveTextDocument.fire(document)
      return document.uri
    })

    _textDocuments: TextDocument[] = []
    get textDocuments(): readonly vscode.TextDocument[] {
      return this._textDocuments
    }

    _getTextDocumentFromUri(uri: Uri): TextDocument | undefined {
      return this._textDocuments.find(doc => doc.uri.toString() === uri.toString())
    }

    openTextDocument = vi.fn(async (arg?: vscode.Uri | string | {
      language?: string
      content?: string
    }): Promise<vscode.TextDocument> => {
      if (Uri.isUri(arg) || typeof arg === 'string') {
        const uri = typeof arg === 'string' ? Uri.file(arg) : arg
        const existing = this._getTextDocumentFromUri(uri)
        if (existing)
          return existing
        const document = new TextDocument(_context, uri, Unimplemented('languageId'), /* TODO: */ null!)
        this._textDocuments.push(document)
        this._onDidOpenTextDocument.fire(document)
        return document
      }
      else {
        const options = arg as {
          language?: string
          content?: string
        }
        const document = new TextDocument(_context, Uri.from({
          scheme: 'untitled',
          path: Date.now().toString(),
        }), options.language ?? 'plaintext', /* TODO: */ null!)
        if (options.content)
          document._text = options.content
        this._onDidOpenTextDocument.fire(document)
        return document
      }
    })

    _closeTextDocument(document: TextDocument) {
      document._closed = true
      const index = this._textDocuments.indexOf(document)
      if (index < 0)
        throw new Error('Cannot close text document: Text document not opened')
      this._textDocuments.splice(index, 1)
      this._onDidCloseTextDocument.fire(document)
    }

    _onDidOpenTextDocument = new EventEmitter<TextDocument>()
    onDidOpenTextDocument = this._onDidOpenTextDocument.event

    _onDidCloseTextDocument = new EventEmitter<TextDocument>()
    onDidCloseTextDocument = this._onDidCloseTextDocument.event

    _onDidChangeTextDocument = new EventEmitter<vscode.TextDocumentChangeEvent>()
    onDidChangeTextDocument = this._onDidChangeTextDocument.event

    _onWillSaveTextDocument = new EventEmitter<vscode.TextDocumentWillSaveEvent>()
    onWillSaveTextDocument = this._onWillSaveTextDocument.event

    _onDidSaveTextDocument = new EventEmitter<TextDocument>()
    onDidSaveTextDocument = this._onDidSaveTextDocument.event
  })()
}

export const defaultWorkspaceInitConfig = {
  workspaceFolders: [{
    uri: Uri.from({
      scheme: 'file',
      path: '/workspace',
    }),
    name: 'workspace',
    index: 0,
  }] as vscode.WorkspaceFolder[],
}

export type MockWorkspace = ReturnType<typeof createMockWorkspace>
