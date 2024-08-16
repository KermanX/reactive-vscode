import type vscode from 'vscode'
import { vi } from 'vitest'

export class Disposable implements vscode.Disposable {
  constructor(public callOnDispose: () => any) {
  }

  _disposed = false

  dispose = vi.fn((): any => {
    this._disposed = true
    return this.callOnDispose()
  })

  static from(...disposableLikes: {
    dispose: () => any
  }[]): Disposable {
    return new Disposable(() => {
      disposableLikes.forEach(disposableLike => disposableLike.dispose())
    })
  }
}
