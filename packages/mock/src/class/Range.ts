import type vscode from 'vscode'
import { Position } from './Position'

export class Range implements vscode.Range {
  constructor(start: Position, end: Position)
  constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number)
  constructor(
    a: Position | number,
    b: Position | number,
    c?: number,
    d?: number,
  ) {
    if (typeof a === 'number') {
      this.start = new Position(a, b as number)
      this.end = new Position(c as number, d as number)
    }
    else {
      this.start = a
      this.end = b as Position
    }
  }

  start: Position
  end: Position

  get isEmpty(): boolean {
    return this.start.isEqual(this.end)
  }

  get isSingleLine(): boolean {
    return this.start.line === this.end.line
  }

  contains(positionOrRange: Position | Range): boolean {
    return positionOrRange instanceof Range
      ? this.contains(positionOrRange.start) && this.contains(positionOrRange.end)
      : this.start.isBeforeOrEqual(positionOrRange) && this.end.isAfterOrEqual(positionOrRange)
  }

  isEqual(other: Range): boolean {
    return this.start.isEqual(other.start) && this.end.isEqual(other.end)
  }

  intersection(range: Range): Range | undefined {
    const start = this.start.isBefore(range.start) ? range.start : this.start
    const end = this.end.isAfter(range.end) ? range.end : this.end

    if (start.isAfter(end)) {
      return undefined
    }

    return new Range(start, end)
  }

  union(other: Range): Range {
    const start = this.start.isBefore(other.start) ? this.start : other.start
    const end = this.end.isAfter(other.end) ? this.end : other.end
    return new Range(start, end)
  }

  with(start?: Position, end?: Position): Range
  with(change: { start?: Position, end?: Position }): Range
  with(startOrChange: Position | { start?: Position, end?: Position } = this.start, end: Position = this.end): Range {
    return startOrChange instanceof Position
      ? new Range(startOrChange, end)
      : new Range(startOrChange.start ?? this.start, startOrChange.end ?? this.end)
  }
}
