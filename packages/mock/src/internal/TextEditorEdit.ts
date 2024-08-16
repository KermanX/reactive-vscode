import type vscode from 'vscode'
import { vi } from 'vitest'
import type { TextDocument } from './TextDocument'

export class TextEditorEdit implements vscode.TextEditorEdit {
  constructor(public _document: TextDocument) {}

  _anyEdit = () => {
    this._document._change()
  }

  replace = vi.fn(this._anyEdit)

  insert = vi.fn(this._anyEdit)

  delete = vi.fn(this._anyEdit)

  setEndOfLine = vi.fn(this._anyEdit)
}
