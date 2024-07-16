import type vscode from 'vscode'
import { vi } from 'vitest'
import type { MockVscode } from '../ns/index'
import type { TextDocument } from './TextDocument'
import { TextEditorEdit } from './TextEditorEdit'

export class TextEditor implements vscode.TextEditor {
  constructor(
    public _context: MockVscode,
    public _document: TextDocument,
  ) {
  }

  _selections: vscode.Selection[] = []
  _viewColumn: vscode.ViewColumn | undefined
  _visibleRanges: vscode.Range[] = []

  _updateVisibleRanges(val: vscode.Range[]) {
    this._visibleRanges = val
    this._context.window._onDidChangeTextEditorVisibleRanges.fire({
      textEditor: this,
      visibleRanges: this._visibleRanges,
    })
  }

  get document(): vscode.TextDocument {
    return this._document
  }

  get selection(): vscode.Selection {
    return this._selections[0]
  }

  get selections(): readonly vscode.Selection[] {
    return this._selections
  }

  options: vscode.TextEditorOptions = {}

  get viewColumn(): vscode.ViewColumn | undefined {
    return this._viewColumn
  }

  get visibleRanges(): vscode.Range[] {
    return this._visibleRanges
  }

  edit = vi.fn(async (callback: (editBuilder: vscode.TextEditorEdit) => void, _options?: any): Promise<boolean> => {
    callback(new TextEditorEdit(this._document))
    return true
  })

  insertSnippet = vi.fn(async (): Promise<boolean> => {
    this._document._change()
    return true
  })

  _decorations = new Map<vscode.TextEditorDecorationType, vscode.Range[] | vscode.DecorationOptions[]>()

  setDecorations = vi.fn((decorationType: vscode.TextEditorDecorationType, rangesOrOptions: vscode.Range[] | vscode.DecorationOptions[]): void => {
    this._decorations.set(
      decorationType,
      rangesOrOptions,
    )
  })

  revealRange = vi.fn((range: vscode.Range, _revealType?: vscode.TextEditorRevealType) => {
    this._updateVisibleRanges([range])
  })

  show = vi.fn(() => {
    throw new Error('Deprecated')
  })

  hide = vi.fn(() => {
    throw new Error('Deprecated')
  })
}
