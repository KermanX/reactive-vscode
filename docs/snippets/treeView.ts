import { computed, createSingletonComposable, useTreeView } from 'reactive-vscode'
import { TreeItemCollapsibleState } from 'vscode'

export const useDemoTreeView = createSingletonComposable(() => {
  const rootNodes = computed(() => [
    { data: 1, children: [{ data: 2 }] },
    { data: 3 },
  ])
  // return anything you want to expose
  return useTreeView(
    'reactive-tree-view',
    rootNodes,
    {
      title: () => `Tree with ${rootNodes.value.length} roots`,
      getTreeItem(node) {
        return {
          label: `Item ${node.data}`,
          collapsibleState: node.children?.length ? TreeItemCollapsibleState.Expanded : TreeItemCollapsibleState.None,
        }
      },
    },
  )
})
