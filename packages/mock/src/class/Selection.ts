import type vscode from 'vscode'
import { Position } from './Position'
import { Range } from './Range'

export class Selection implements vscode.Selection, vscode.Range {
  constructor(anchor: vscode.Position, active: vscode.Position)
  constructor(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number)
  constructor(a: any, b: any, c?: any, d?: any) {
    if (typeof a === 'number') {
      this.anchor = new Position(a, b)
      this.active = new Position(c, d)
    }
    else {
      this.anchor = a
      this.active = b
    }
  }

  anchor: vscode.Position
  active: vscode.Position

  get isReversed(): boolean {
    return this.anchor.isAfter(this.active)
  }

  get _range(): Range {
    return this.isReversed ? new Range(this.active, this.anchor) : new Range(this.anchor, this.active)
  }

  get start(): vscode.Position {
    return this._range.start
  }

  get end(): vscode.Position {
    return this._range.end
  }

  get isEmpty(): boolean {
    return this.anchor.isEqual(this.active)
  }

  get isSingleLine(): boolean {
    return this.anchor.line === this.active.line
  }

  contains(positionOrRange: vscode.Position | vscode.Range): boolean {
    return this._range.contains(positionOrRange)
  }

  isEqual(other: vscode.Range): boolean {
    return this._range.isEqual(other)
  }

  intersection(range: vscode.Range): vscode.Range | undefined {
    return this._range.intersection(range)
  }

  union(other: vscode.Range): vscode.Range {
    return this._range.union(other)
  }

  with(...args: any): vscode.Range {
    return this._range.with(...args)
  }
}
