# VueUse Integration

<ReactiveVscode /> provides an optional integration of [VueUse](https://vueuse.org/) for VSCode extension development.

This package contains a subset of VueUse functions that are compatible with the Node.js environment. This means functions that rely on the browser environment are removed.

Also, this package uses Vue reactivity API from `npm::@reactive-vscode/reactivity` instead of `npm::vue-demi` package. This means functions that rely on Vue's rendering API are removed.

## Usage

::: code-group

```bash [pnpm]
pnpm install -D @reactive-vscode/vueuse
```

```bash [npm]
npm install -D @reactive-vscode/vueuse
```

```bash [yarn]
yarn add -D @reactive-vscode/vueuse
```

:::

```ts
import { useIntervalFn } from '@reactive-vscode/vueuse'
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  useIntervalFn(() => {
    console.log('Hello World')
  }, 1000)
})
```

## Available Functions

Every VueUse function that is compatible with the Node.js environment and doesn't require Vue's rendering API is available in this package. Check it out [`packages/vueuse/src/index.ts`](https://github.com/kermanx/reactive-vscode/blob/main/packages/vueuse/src/index.ts) for the full list.
