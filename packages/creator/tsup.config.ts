import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./index.ts'],
  outDir: './dist',
  format: ['cjs'],
  target: 'node18',
  clean: true,
  minify: true,
})
