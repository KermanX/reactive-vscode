import type vscode from 'vscode'

export class Hover implements vscode.Hover {
  contents: Array<vscode.MarkdownString | vscode.MarkedString>

  constructor(contents: vscode.MarkdownString | vscode.MarkedString | Array<vscode.MarkdownString | vscode.MarkedString>, public range?: vscode.Range) {
    this.contents = Array.isArray(contents) ? contents : [contents]
  }
}
