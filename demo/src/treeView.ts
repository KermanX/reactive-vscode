import { createSingletonComposable, useTreeView } from 'reactive-vscode'
import { TreeItemCollapsibleState } from 'vscode'

export const useDemoTreeView = createSingletonComposable(() => {
  return useTreeView(
    'reactive-tree-view',
    [
      {
        data: 1,
        children: [
          { data: 2 },
          { data: 3 },
        ],
      },
      {
        data: 4,
      },
      {
        data: 5,
      },
    ],
    {
      getTreeItem(node) {
        return {
          label: `Item ${node.data}`,
          collapsibleState: node.children?.length ? TreeItemCollapsibleState.Expanded : TreeItemCollapsibleState.None,
        }
      },
    },
  )
})
