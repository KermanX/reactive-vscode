import { defineExtension, ref, useCommands, useStatusBarItem } from 'reactive-vscode'
import { StatusBarAlignment } from 'vscode'

export = defineExtension(() => {
  const counter = ref(0)

  useStatusBarItem({
    alignment: StatusBarAlignment.Right,
    priority: 100,
    text: () => `$(megaphone) Hello*${counter.value}`,
  })

  useCommands({
    'extension.sayHello': () => counter.value++,
    'extension.sayGoodbye': () => counter.value--,
  })
})
