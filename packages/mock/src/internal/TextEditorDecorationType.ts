import type vscode from 'vscode'
import { Disposable } from '../class/Disposable'

export class TextEditorDecorationType extends Disposable implements vscode.TextEditorDecorationType {
  constructor(public _key: string) {
    super(() => {})
  }

  get key(): string {
    return this._key
  }
}
