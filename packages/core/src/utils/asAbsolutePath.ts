import { extensionContext } from '../utils'

/**
 * A shorthand for `vscode::ExtensionContext.asAbsolutePath`
 */
export function asAbsolutePath(relativePath: string, silent?: false): string
export function asAbsolutePath(relativePath: string, silent?: boolean): string | undefined
export function asAbsolutePath(relativePath: string, silent = false) {
  const extCtx = extensionContext.value
  if (!extCtx && !silent)
    throw new Error('Cannot get absolute path because the extension is not activated yet')
  return extCtx?.asAbsolutePath(relativePath)
}
