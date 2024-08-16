import type vscode from 'vscode'
import * as vscodeUri from 'vscode-uri'

export class Uri extends vscodeUri.URI implements vscode.Uri {
  static joinPath(uri: Uri, ...parts: string[]): Uri {
    return vscodeUri.Utils.joinPath(uri, ...parts)
  }
}
