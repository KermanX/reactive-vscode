# Extension Entry File

It's simple to create a VSCode extension with `reactive-vscode`. You just need to define your extension code inside the `defineExtension` function, and export the returned `activate` and `deactivate` functions.

```ts
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  // Your extension code here
})
```

::: details TypeScript Configuration <span class="i-vscode-icons:file-type-typescript-official text-2xl mt--1"></span>
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
