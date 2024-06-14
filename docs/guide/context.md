# Custom contexts

VSCode's [when clause contexts](https://code.visualstudio.com/api/references/when-clause-contexts) can be used to selectively enable or disable extension commands and UI elements, such as menus and views. <ReactiveVscode /> provides `reactive::useVscodeContext` to define custom contexts in a reactive way.

```ts
import { computed, defineExtension, ref, useVscodeContext } from 'reactive-vscode'

export = defineExtension(() => {
  const contextA = useVscodeContext('demo.fromValue', true) // [!code highlight]
  //     ^?

  const contextB = useVscodeContext('demo.fromRef', contextA) // [!code highlight]
  const contextC = useVscodeContext('demo.fromGetter', () => !contextA.value) // [!code highlight]
  //     ^?
})
```

For more information about when clause contexts, please refer to the [official documentation](https://code.visualstudio.com/api/references/when-clause-contexts).
