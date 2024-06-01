import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watch } from '@vue/runtime-core'
import type { ProviderResult } from 'vscode'
import { EventEmitter, window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'
import type { TreeViewNode, TreeViewWithoutParent, UseTreeViewOptions } from './useTreeView'

export interface TreeViewNodeWithParent extends TreeViewNode {
  readonly parent?: ProviderResult<this>
}

/**
 * Register a tree view, in which items has a prarent. See `vscode::window.createTreeView`.
 *
 * @category view
 */
export const useTreeViewWithParent = createKeyedComposable(
  <T extends TreeViewNodeWithParent>(
    viewId: string,
    treeData: MaybeRefOrGetter<T[]>,
    options: UseTreeViewOptions<T>,
  ): TreeViewWithoutParent<T> => {
    const normalizedOptions = typeof options === 'function' ? { getTreeItem: options } : options
    const changeEventEmitter = new EventEmitter<void>()

    watch(treeData, () => changeEventEmitter.fire())

    return useDisposable(window.createTreeView(viewId, {
      ...normalizedOptions,
      treeDataProvider: {
        ...normalizedOptions,
        onDidChangeTreeData: changeEventEmitter.event,
        getTreeItem(node: T) {
          return normalizedOptions.getTreeItem(node)
        },
        getChildren(node?: T) {
          return node ? node.children : toValue(treeData)
        },
        getParent(node: T) {
          return node.parent
        },
      },
    }))
  },
  viewId => viewId,
)
