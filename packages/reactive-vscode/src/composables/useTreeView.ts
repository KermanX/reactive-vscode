import type { TreeDataProvider, TreeView, TreeViewOptions } from 'vscode'
import { EventEmitter, window } from 'vscode'
import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watch } from '@vue/runtime-core'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

export interface TreeViewNode<T> {
  readonly element: T
  readonly children: TreeViewNode<T>[]
}

export type UseTreeViewOptions<T> =
  | (
    & Omit<TreeViewOptions<T>, 'treeDataProvider'>
    & Pick<TreeDataProvider<T>, 'getTreeItem' | 'resolveTreeItem'>
  )
  | TreeDataProvider<T>['getTreeItem']

export type TreeViewWithoutParent<T> = Omit<TreeView<T>, 'reveal'>

/**
 * Register a tree view. See {{window.createTreeView}}.
 *
 * @category view
 */
export const useTreeView = createKeyedComposable(
  <T>(
    viewId: string,
    treeData: MaybeRefOrGetter<TreeViewNode<T>[]>,
    options: UseTreeViewOptions<TreeViewNode<T>>,
  ): TreeViewWithoutParent<TreeViewNode<T>> => {
    const normalizedOptions = typeof options === 'function' ? { getTreeItem: options } : options
    const changeEventEmitter = new EventEmitter<void>()

    watch(treeData, () => changeEventEmitter.fire())

    return useDisposable(window.createTreeView(viewId, {
      ...normalizedOptions,
      treeDataProvider: {
        ...normalizedOptions,
        onDidChangeTreeData: changeEventEmitter.event,
        getTreeItem(node: TreeViewNode<T>) {
          return normalizedOptions.getTreeItem(node)
        },
        getChildren(node?: TreeViewNode<T>) {
          return node ? node.children : toValue(treeData)
        },
      },
    }))
  },
  viewId => viewId,
)
