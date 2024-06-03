# Commands

Commands trigger actions. Commands expose functionality to users, bind to actions in VS Code's UI, and implement internal logic.

There are some [built-in commands](https://code.visualstudio.com/api/references/commands) in VS Code, and you can also define your own commands.

## Define in Manifest

As described in the [official documentation](https://code.visualstudio.com/api/references/contribution-points#contributes.commands), you need to define the commands in the `contributes.commands` field in the `package.json`.

```json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World",
        "category": "Hello",
        "icon": {
          "light": "path/to/light/icon.svg",
          "dark": "path/to/dark/icon.svg"
        }
      }
    ]
  }
}
```

## Register Commands

You can use the `reactive::useCommand` or `reactive::useCommands` function to register commands in your extension.

```ts
import { window } from 'vscode'
import { defineExtension, ref, useCommand, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const helloCounter = ref(0)
  useCommand('extension.sayHello', () => {
    window.showInformationMessage('Hello World')
    helloCounter.value++
  })

  watchEffect(() => {
    if (helloCounter.value > 99)
      window.showWarningMessage('You have said hello too many times!')
  })
})
```
