import type { TreeViewNode } from 'reactive-vscode'
import { computed, createSingletonComposable, useTreeView } from 'reactive-vscode'
import { TreeItemCollapsibleState } from 'vscode'
import { calledTimes } from './states'

export const useDemoTreeView = createSingletonComposable(() => {
  function getRootNode(index: number) {
    return {
      children: [
        getChildNode(index * 10 + 1),
        getChildNode(index * 10 + 2),
      ],
      treeItem: {
        label: `Root ${index}`,
        collapsibleState: TreeItemCollapsibleState.Expanded,
      },
    }
  }

  function getChildNode(index: number) {
    return {
      treeItem: {
        label: `Child ${index}`,
        collapsibleState: TreeItemCollapsibleState.None,
      },
    }
  }

  const treeData = computed(() => {
    const roots: TreeViewNode[] = []
    for (let i = 0; i < calledTimes.value; i++)
      roots.push(getRootNode(i))
    return roots
  })

  return useTreeView(
    'reactive-tree-view',
    treeData,
  )
})
