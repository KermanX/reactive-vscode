# Disposables

Although most of the VSCode API is covered by <ReactiveVscode />, sometimes you still need to work with `vscode::Disposable`, which is also described in [VSCode API Patterns](https://code.visualstudio.com/api/references/vscode-api#disposables).

`reactive::useDisposable` accepts a disposable object and automatically disposes it when the current effect scope is disposed (e.g., when the extension is deactivated, if `vscode::useDisposable` is called in the extension's setup function). `reactive::useDisposable` returns the disposable object itself as is.

```ts
import { defineExtension, useDisposable } from 'reactive-vscode'
import type { TextDocument } from 'vscode'
import { languages } from 'vscode'

export = defineExtension(() => {
  useDisposable(languages.registerFoldingRangeProvider(
    { language: 'markdown' },
    {
      provideFoldingRanges(document: TextDocument) {
        return []
      },
    },
  ))
})
```

Note that you needn't to use `reactive::useDisposable` for disposables created by any <ReactiveVscode /> functions. They are automatically disposed when the current effect scope is disposed.
