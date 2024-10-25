import type vscode from 'vscode'
import type { MockVscode } from '../ns/index'
import { Position } from '../class/Position'
import { Range } from '../class/Range'
import { EndOfLine } from '../enum/EndOfLine'
import { Unimplemented } from '../utils/unimplemented'

export class TextDocument implements vscode.TextDocument {
  constructor(
    public _context: MockVscode,
    public uri: vscode.Uri,
    public languageId: string,
    public eol: EndOfLine,
  ) {
  }

  _change() {
    this._version++
    this._context.workspace._onDidChangeTextDocument.fire({
      document: this,
      contentChanges: [Unimplemented('context changes')],
      reason: undefined,
    })
  }

  _setText(text: string) {
    this._dirty = true
    this._text = text
    this._change()
  }

  _close() {
    this._context.workspace._closeTextDocument(this)
  }

  _dirty = false
  _version = 0
  _closed = false
  _text = ''

  get fileName(): string {
    return this.uri.fsPath
  }

  get isUntitled(): boolean {
    return false
  }

  get isDirty(): boolean {
    return this._dirty
  }

  get version(): number {
    return this._version
  }

  get isClosed(): boolean {
    return this._closed
  }

  async save(): Promise<boolean> {
    return !!await this._context.workspace.save(this.uri)
  }

  get _lines(): string[] {
    return this.eol === EndOfLine.LF ? this._text.split('\n') : this._text.split('\r\n')
  }

  get lineCount(): number {
    return this._lines.length
  }

  lineAt(lineOrPos: number | Position): vscode.TextLine {
    const line = typeof lineOrPos === 'number' ? lineOrPos : lineOrPos.line
    const text = this._lines[line]
    return {
      lineNumber: line,
      text,
      range: new Range(line, 0, line, text.length),
      rangeIncludingLineBreak: new Range(line, 0, line + 1, 0),
      firstNonWhitespaceCharacterIndex: text.search(/\S|$/),
      isEmptyOrWhitespace: !text.trim(),
    }
  }

  offsetAt(position: Position): number {
    let offset = 0
    for (let i = 0; i < position.line; i++) {
      offset += this._lines[i].length + this.eol
    }
    return offset + position.character
  }

  positionAt(offset: number): Position {
    let line = 0
    while (line < this.lineCount && offset >= this._lines[line].length) {
      offset -= this._lines[line].length + this.eol
      line++
    }
    return new Position(line, offset)
  }

  getText(range?: Range): string {
    if (!range) {
      return this._text
    }
    const start = this.offsetAt(range.start)
    const end = this.offsetAt(range.end)
    return this._text.substring(start, end)
  }

  getWordRangeAtPosition(_position: Position, _regex?: RegExp): Range | undefined {
    return Unimplemented('WordRangeAtPosition')
  }

  validateRange(range: Range): Range {
    return new Range(
      this.validatePosition(range.start),
      this.validatePosition(range.end),
    )
  }

  validatePosition(position: Position): Position {
    return position.line < this.lineCount
      ? position.character < this._lines[position.line].length
        ? position
        : new Position(position.line, this._lines[position.line].length)
      : this.positionAt(this._text.length)
  }

  _applyEdit(edit: vscode.TextEdit) {
    const start = this.offsetAt(edit.range.start)
    const end = this.offsetAt(edit.range.end)
    this._text = this._text.slice(0, start) + edit.newText + this._text.slice(end)
    if (edit.newEol)
      this._changeEol(edit.newEol)
  }

  _changeEol(newEol: vscode.EndOfLine) {
    if (this.eol === newEol)
      return
    if (newEol === EndOfLine.LF)
      this._text = this._text.replaceAll('\r\n', '\n')
    else
      this._text = this._text.replaceAll(/\r?\n/g, '\r\n')
  }
}
