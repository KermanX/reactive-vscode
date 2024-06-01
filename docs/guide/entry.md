# Extension Entry File

It's simple to create a VSCode extension with <ReactiveVscode />. You just need to define your extension code inside the `reactive::defineExtension` function, and export the returned `activate` and `deactivate` functions.

```ts
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  // Setup your extension code here
})
```

::: details TypeScript Configuration <span class="i-vscode-icons:file-type-typescript-official text-2xl mt--1 ml-1"></span>
VSCode extensions should be CommonJS modules. Since `export =` statement is not allowed in ESM, you need to add this in your `tsconfig.json` to make TypeScript happy if you use a Bundler like `tsup`.

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "Preserve"
  }
}
```

Or you can avoid the `export =` statement in this way:

```ts
const { activate, deactivate } = defineExtension(() => {
  // Your extension code here
})
export { activate, deactivate }
```
:::

The setup function is similar to the content of [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html#script-setup) tag. It defines how your extension should behave. This function will be called once when the extension is activated.
