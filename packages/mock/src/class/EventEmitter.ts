import type vscode from 'vscode'
import { vi } from 'vitest'
import { Disposable } from './Disposable'

export class EventEmitter<T> extends Disposable implements vscode.EventEmitter<T> {
  constructor() {
    super(() => this._listeners.clear())
  }

  _listeners = new Set<(e: T) => any>()

  event: vscode.Event<T> = vi.fn((listener, thisArgs, disposables) => {
    const cb = (e: T) => listener.call(thisArgs, e)
    this._listeners.add(cb)
    const disposable = new Disposable(() => this._listeners.delete(cb))
    disposables?.push(disposable)
    return disposable
  })

  fire = vi.fn((data: T): void => {
    for (const listener of this._listeners) {
      listener(data)
    }
  })
}
