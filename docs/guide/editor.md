# Editor & Document

Editors and documents are the core of the VS Code extension development. In this guide, we will learn how to interact with the editor and document.

## The Active Editor

The active editor is the one that currently has focus or, when none has focus, the one that has changed input most recently. The `reactive::useActiveTextEditor` and `reactive::useActiveNotebookEditor`  composable can be used to get the active text editor.

```ts
import { defineExtension, useActiveNotebookEditor, useActiveTextEditor, watchEffect } from 'reactive-vscode'
import type { ExtensionContext } from 'vscode'

export = defineExtension(() => {
  const textEditor = useActiveTextEditor() // [!code highlight]
  const notebookEditor = useActiveNotebookEditor() // [!code highlight]

  watchEffect(() => {
    console.log('Active Text Editor:', textEditor.value)
    console.log('Active Notebook Editor:', notebookEditor.value)
    //                                                      ^?
  })
})
```

## Visible Editors

The `reactive::useVisibleTextEditors` and `reactive::useVisibleNotebookEditors` composable can be used to get the visible text editors.

```ts
import { defineExtension, useVisibleNotebookEditors, useVisibleTextEditors, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const textEditors = useVisibleTextEditors()
  const notebookEditors = useVisibleNotebookEditors()

  watchEffect(() => {
    console.log('Visible Text Editors:', textEditors.value)
    console.log('Visible Notebook Editors:', notebookEditors.value)
    //                                                         ^?
  })
})
```

## Get Editor Document

- `vscode::TextEditor.document` is the document associated with this text editor.

- `vscode::NotebookEditor.notebook` the [notebook document](https://code.visualstudio.com/api/references/vscode-api#NotebookDocument) associated with this notebook editor.

The document will be the same for the entire lifetime of this text editor or notebook editor.

```ts
import { computed, defineExtension, useActiveTextEditor } from 'reactive-vscode'
import type { ExtensionContext } from 'vscode'

export = defineExtension(() => {
  const textEditor = useActiveTextEditor()
  const document = computed(() => textEditor.value?.document) // [!code highlight]
  //     ^?
})
```

## Document Text

The `reactive::useDocumentText` composable can be used to get the text of the active document.

```ts
import { computed, defineExtension, useActiveTextEditor, useDocumentText } from 'reactive-vscode'
import type { ExtensionContext } from 'vscode'

export = defineExtension(() => {
  const textEditor = useActiveTextEditor()
  const document = computed(() => textEditor.value?.document)
  const text = useDocumentText(document) // [!code highlight]
  //     ^?
})
```

The returned `text` is settable, which means you can update the text of the document.

<!-- eslint-disable import/first -->
```ts
import { computed, defineExtension, ref, useActiveTextEditor, useDocumentText, watchEffect } from 'reactive-vscode'
import type { ExtensionContext } from 'vscode'

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
    () => [/* Dynamic caculated ranges */] // Or Ref/Computed
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

See their docs for more information.

## Editor Viewport

The following 3 composable can be used to **get** the viewport information of editors.

- `reactive::useTextEditorViewColumn` - The view column of the text editor.
- `reactive::useTextEditorVisibleRanges` - The visible ranges of the text editor.
- `reactive::useNotebookEditorVisibleRanges` - The visible ranges of the notebook editor.

See their docs for more information.
