import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watch } from '@vue/runtime-core'
import { EventEmitter, window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'
import type { TreeViewNode, TreeViewWithoutParent, UseTreeViewOptions } from './useTreeView'

export interface TreeViewNodeWithParent<T> extends TreeViewNode<T> {
  readonly parent?: TreeViewNodeWithParent<T>
}

/**
 * Register a tree view, in which items has a prarent. See {{window.createTreeView}}.
 *
 * @category view
 */
export const useTreeViewWithParent = createKeyedComposable(
  <T>(
    viewId: string,
    treeData: MaybeRefOrGetter<TreeViewNodeWithParent<T>[]>,
    options: UseTreeViewOptions<TreeViewNodeWithParent<T>>,
  ): TreeViewWithoutParent<TreeViewNodeWithParent<T>> => {
    const normalizedOptions = typeof options === 'function' ? { getTreeItem: options } : options
    const changeEventEmitter = new EventEmitter<void>()

    watch(treeData, () => changeEventEmitter.fire())

    return useDisposable(window.createTreeView(viewId, {
      ...normalizedOptions,
      treeDataProvider: {
        ...normalizedOptions,
        onDidChangeTreeData: changeEventEmitter.event,
        getTreeItem(node: TreeViewNodeWithParent<T>) {
          return normalizedOptions.getTreeItem(node)
        },
        getChildren(node?: TreeViewNodeWithParent<T>) {
          return node ? node.children : toValue(treeData)
        },
        getParent(node: TreeViewNodeWithParent<T>) {
          return node.parent
        },
      },
    }))
  },
  viewId => viewId,
)
