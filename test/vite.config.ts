/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    alias: {
      vscode: resolve('./mock/vscode.ts'),
    },
  },
})
