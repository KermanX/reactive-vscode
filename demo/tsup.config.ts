import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/extension.ts'],
  format: ['cjs'],
  target: 'node18',
  clean: true,
  minify: true,
  external: [
    'vscode',
  ],
  plugins: [
    {
      name: 'alias',
      esbuildOptions(options) {
        options.alias ||= {}
        options.alias['reactive-vscode'] = fileURLToPath(new URL('../packages/core/src/index.ts', import.meta.url))
      },
    },
  ],
})
