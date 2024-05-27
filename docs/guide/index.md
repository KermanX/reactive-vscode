# Get Started

Reactive VSCode is a library that helps you develop Visual Studio Code extensions with [Vue's Reactivity API](https://vuejs.org/api/reactivity-core.html). We assume you are already familiar with the basic ideas of [Vue's Reactivity API](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) and [Vue Composables](https://vuejs.org/guide/reusability/composables.html) before you continue.

## Installation

::: code-group

```bash [pnpm]
pnpm i -D reactive-vscode
```

```bash [npm]
npm i -D reactive-vscode
```

```bash [yarn]
yarn add reacive-vscode --save-dev
```

:::

## Package Exports

The package exports the following:

- Utility functions and types, like `reactive::defineExtension`
- Wrappers of VSCode APIs as composables, like `reactive::useActiveTextEditor`
- All exports from `npm::@vue/reactivity`, like `vue::ref`
- Exports that are useful for VSCode extension from `npm::@vue/runtime-core`, like `vue::watchEffect`

You can find all the implemented composables [here](../functions.md). They will be documented in the future.

---

🚧 *UNDER CONSTRUCTION* 🚧

You can visit [Why reactive-vscode](./why.md) first.
