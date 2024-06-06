import { defineConfigs, defineExtension, useActiveEditorDecorations } from 'reactive-vscode'

const { decorations } = defineConfigs('demo', { decorations: Boolean })

export = defineExtension(() => {
  useActiveEditorDecorations(
    {
      backgroundColor: 'red',
    },
    () => decorations.value ? [/* ... Caclulated ranges ... */] : [],
  )
})
