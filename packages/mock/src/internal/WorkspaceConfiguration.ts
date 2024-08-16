import type vscode from 'vscode'
import { vi } from 'vitest'
import { Unimplemented } from '../utils/unimplemented'
import type { MockVscode } from '../ns'

export class WorkspaceConfiguration implements vscode.WorkspaceConfiguration {
  constructor(public _context: MockVscode, public _data: any, public _baseSection?: string) {
  }

  get = vi.fn(<T>(section: string, defaultValue?: T): T | undefined => {
    let obj = this._data
    for (const key of section.split('.')) {
      if (!(key in obj))
        return defaultValue
      obj = obj[key]
    }
    return obj
  })

  has = vi.fn((section: string): boolean => {
    let obj = this._data
    for (const key of section.split('.')) {
      if (!(key in obj))
        return false
      obj = obj[key]
    }
    return true
  })

  inspect = vi.fn((_section: string) => {
    return Unimplemented('configInspectResult')
  })

  update = vi.fn(async (section: string, value: any, _configurationTarget?: vscode.ConfigurationTarget | boolean | null, _overrideInLanguage?: boolean): Promise<void> => {
    let obj = this._data
    const keys = section.split('.')
    for (const key of keys.slice(0, -1)) {
      if (!(key in obj))
        obj[key] = {}
      obj = obj[key]
    }
    obj[keys[keys.length - 1]] = value
    this._context.workspace._onDidChangeConfiguration.fire({
      affectsConfiguration: vi.fn((check: string, _resource?: vscode.Uri) => {
        return (this._baseSection ? `${this._baseSection}.` : `${section}`).startsWith(check)
      }),
    })
  })
}
