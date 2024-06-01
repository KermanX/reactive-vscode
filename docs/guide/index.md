---
outline: [2,3]
---

# Get Started

Reactive VSCode is a library that helps you develop Visual Studio Code extensions with [Vue's Reactivity API](https://vuejs.org/api/reactivity-core.html). We assume you are already familiar with the basic ideas of [Vue's Reactivity API](https://vuejs.org/guide/essentials/reactivity-fundamentals.html).

Read [Why reactive-vscode](./why.md) for more information about why <ReactiveVscode /> is created.

## Create a New Project

::: code-group

```bash [pnpm]
pnpm create reactive-vscode
```

```bash [npm]
npm init reactive-vscode@latest
```

```bash [yarn]
yarn create reactive-vscode
```

:::

Or you can add it to an existing project by installing the `reactive-vscode` package.

## Package Exports

The package exports the following:

- Utility functions and types, like `reactive::defineExtension`
- Wrappers of VSCode APIs as composables, like `reactive::useActiveTextEditor`
- All exports from `npm::@vue/reactivity`, like `vue::ref(https://vuejs.org/api/reactivity-core.html#ref)`
- Exports that are useful for VSCode extension from `npm::@vue/runtime-core`, like `vue::watchEffect(https://vuejs.org/api/reactivity-core.html#watcheffect)`

You can find all the implemented composables [here](../functions/index.md). They will be documented in the future.

## Extension Basics

### Extension Manifest

Each VS Code extension must have a `package.json` as its [Extension Manifest](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-manifest). Please visit the [official documentation](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-manifest) for more information.

### Extension Entry File

Usually, the [extension entry file](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-entry-file) is `src/extension.ts`. You can define your extension by using the `reactive::defineExtension` function:

```ts
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  // Setup your extension here
})
```

We will introduce how to write the body of your extension in [the next section](./extension.md).

## Developing the Extension

1. Open a new terminal and run the following command:

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

:::

2. Inside the editor, press <kbd>F5</kbd> or run the command **Debug: Start Debugging** from the Command Palette (<kbd>Ctrl+Shift+P</kbd>). This will run the extension in a new window.

> Visit the [VSCode Documentation](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension) for more information about debugging the extension.

---

::: tip [Twoslash](https://twoslash.netlify.app/) powered!

You can hover the tokens in code blocks to see the type definitions for some uncovered functions.

:::
