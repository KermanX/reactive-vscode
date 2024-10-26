import type { ExtensionContext } from 'vscode'
/* eslint-disable import/first */
import { computed, defineExtension, ref, useActiveTextEditor, useDocumentText, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)

  // Reactive, may be set from other places
  const name = ref('John Doe')

  watchEffect(() => {
    text.value = `Hello, ${name.value}!` // [!code highlight]
  })
})
```

## Editor Decoration

The `reactive::useEditorDecorations` composable can be used to add decorations to the editor.

```ts {5-9}
import { defineExtension, useActiveTextEditor, useEditorDecorations } from 'reactive-vscode'

export = defineExtension(() => {
  const editor = useActiveTextEditor()
  useEditorDecorations(
    editor,
    { backgroundColor: 'red' }, // Or created decoration type
    () => [/* Dynamic calculated ranges */] // Or Ref/Computed
  )
})
```

See `vscode::TextEditor.setDecorations` for more information. To create a decoration type, use `vscode::window.createTextEditorDecorationType`.

## Editor Selections

The following 4 composable can be used to **get and set** the selections of editors.

- `reactive::useTextEditorSelections` - All selections in the text editor.
- `reactive::useTextEditorSelection` - The primary selection in the text editor.
- `reactive::useNotebookEditorSelections` - All selections in the notebook editor.
- `reactive::useNotebookEditorSelection` - The primary selection in the notebook editor.

See their docs for more information. Note that `reactive::useTextEditorSelections` and `reactive::useTextEditorSelection` also support an `acceptKind` option to filter the change kind which has triggered this event (See `vscode::TextEditorSelectionChangeKind`).

## Editor Viewport

The following 3 composable can be used to **get** the viewport information of editors.

- `reactive::useTextEditorViewColumn` - The view column of the text editor.
- `reactive::useTextEditorVisibleRanges` - The visible ranges of the text editor.
- `reactive::useNotebookEditorVisibleRanges` - The visible ranges of the notebook editor.

See their docs for more information.
