import type vscode from 'vscode'
import { vi } from 'vitest'

export class Memento implements vscode.Memento {
  constructor(public _getData: () => any) {}

  keys(): readonly string[] {
    return Object.keys(this._getData())
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    return this._getData()[key] ?? defaultValue
  }

  async _update(key: string, value: any): Promise<void> {
    this._getData()[key] = value
  }
  update = vi.fn(this._update)

  setKeysForSync = vi.fn()
}
