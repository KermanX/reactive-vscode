import type vscode from 'vscode'
import { vi } from 'vitest'
import { EventEmitter } from '../class/EventEmitter'

export class SecretStorage implements vscode.SecretStorage {
  constructor(public _data: Record<string, string>) {}

  get = vi.fn(async (key: string): Promise<string | undefined> => {
    return this._data[key]
  })

  store = vi.fn(async (key: string, value: string): Promise<void> => {
    this._data[key] = value
  })

  delete = vi.fn(async (key: string): Promise<void> => {
    delete this._data[key]
  })

  _set(key: string, value: string) {
    this._data[key] = value
    this._onDidChange.fire({ key })
  }

  _onDidChange = new EventEmitter<vscode.SecretStorageChangeEvent>()
  onDidChange = this._onDidChange.event
}
