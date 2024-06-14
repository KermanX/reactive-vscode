import { extensionContext } from '../utils'

/**
 * A shorthand for `vscode::ExtensionContext.asAbsolutePath`
 */
export function asAbsolutePath(relativePath: string, slient?: false): string
export function asAbsolutePath(relativePath: string, slient?: boolean): string | undefined
export function asAbsolutePath(relativePath: string, slient = false) {
  const extCtx = extensionContext.value
  if (!extCtx && !slient)
    throw new Error('Cannot get absolute path because the extension is not activated yet')
  return extCtx?.asAbsolutePath(relativePath)
}
