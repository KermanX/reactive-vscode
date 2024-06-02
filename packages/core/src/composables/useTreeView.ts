import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watch } from '@vue/runtime-core'
import type { TreeDataProvider, TreeView, TreeViewOptions } from 'vscode'
import { EventEmitter, window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

export interface TreeViewNode {
  readonly children?: this[]
}

export type UseTreeViewOptions<T> =
  | (
    & Omit<TreeViewOptions<T>, 'treeDataProvider'>
    & Pick<TreeDataProvider<T>, 'getTreeItem' | 'resolveTreeItem'>
  )
  | TreeDataProvider<T>['getTreeItem']

/**
 * Register a tree view. See `vscode::window.createTreeView`.
 *
 * @category view
 */
export const useTreeView = createKeyedComposable(
  <T extends TreeViewNode>(
    viewId: string,
    treeData: MaybeRefOrGetter<T[]>,
    options: UseTreeViewOptions<T>,
  ): TreeView<T> => {
    const normalizedOptions = typeof options === 'function' ? { getTreeItem: options } : options
    const changeEventEmitter = new EventEmitter<void>()

    watch(treeData, () => changeEventEmitter.fire())

    const childrenToParentMap = new WeakMap<T, T>()

    return useDisposable(window.createTreeView(viewId, {
      ...normalizedOptions,
      treeDataProvider: {
        ...normalizedOptions,
        onDidChangeTreeData: changeEventEmitter.event,
        getTreeItem(node: T) {
          return normalizedOptions.getTreeItem(node)
        },
        getChildren(node?: T) {
          if (node) {
            node.children?.forEach(child => childrenToParentMap.set(child, node))
            return node.children
          }
          return toValue(treeData)
        },
        getParent(node: T) {
          return childrenToParentMap.get(node)
        },
      },
    }))
  },
  viewId => viewId,
)
