# Events

Although most of the VSCode API is covered by <ReactiveVscode />, sometimes you still need to create or listen original [VSCode events](https://code.visualstudio.com/api/references/vscode-api#events).

`reactive::useEvent` converts an raw event to a auto-disposed event:

```ts
import { defineExtension, useEvent } from 'reactive-vscode'
import { workspace } from 'vscode'

const onDidCreateFiles = useEvent(workspace.onDidCreateFiles)

export = defineExtension(() => {
  // No need to dispose the event
  onDidCreateFiles((e) => {
    console.log('Files created:', e.files)
  })
})
```

`reactive::useEventEmitter` creates a frindly event emitter, which still extends `vscode::EventEmitter`:

<!-- eslint-disable import/first -->
```ts
import type { Event } from 'vscode'
declare function someVscodeApi(options: { onSomeEvent: Event<string> }): void
// ---cut---
import { defineExtension, useEventEmitter } from 'reactive-vscode'

export = defineExtension(() => {
  const myEvent = useEventEmitter<string>()

  myEvent.addListener((msg) => {
    console.log(`Received message: ${msg}`)
  })

  myEvent.fire('Hello, World!')

  someVscodeApi({
    onSomeEvent: myEvent.event,
  })
})
```
