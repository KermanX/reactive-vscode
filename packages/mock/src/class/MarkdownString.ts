import type vscode from 'vscode'
import { vi } from 'vitest'

export class MarkdownString implements vscode.MarkdownString {
  isTrusted?: boolean | {
    readonly enabledCommands: readonly string[]
  }

  supportHtml?: boolean

  baseUri?: vscode.Uri

  constructor(public value: string = '', public supportThemeIcons?: boolean) {
  }

  appendText = vi.fn((value: string): vscode.MarkdownString => {
    return new MarkdownString(
      this.value + value,
      this.supportThemeIcons,
    )
  })

  appendMarkdown = vi.fn((value: string): vscode.MarkdownString => {
    return new MarkdownString(
      this.value + value,
      this.supportThemeIcons,
    )
  })

  appendCodeblock = vi.fn((value: string, language?: string): vscode.MarkdownString => {
    return new MarkdownString(
      `${this.value}\`\`\`${language ? ` ${language}` : ''}\n${value}\n\`\`\`\n`,
      this.supportThemeIcons,
    )
  })
}
