import { it, vi } from 'vitest'
import extension from '../src/extension'

const context = await vi.hoisted(async () => {
  const { resolve } = await import('node:path')
  const { createMockVSCode } = await import('@reactive-vscode/mock')
  const manifest = await import('../package.json')
  return createMockVSCode({
    manifest,
    root: resolve(__dirname, '..'),
  })
})

vi.mock('vscode', () => context)

it('should activate', async () => {
  extension.activate(context._extensionContext)
})
