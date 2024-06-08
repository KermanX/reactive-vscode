import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    Dts({
      include: [
        './src/**/*.ts',
        './tsconfig.json',
      ],
      rollupTypes: true,
      bundledPackages: ['@vueuse/core', '@vueuse/shared'],
      beforeWriteFile(_, content) {
        return {
          content: content.replaceAll('\'vue-demi\'', '\'@reactive-vscode/reactivity\''),
        }
      },
    }),
  ],
  resolve: {
    alias: {
      'vue-demi': '@reactive-vscode/reactivity',
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['@reactive-vscode/reactivity'],
    },
    minify: false,
  },
})
