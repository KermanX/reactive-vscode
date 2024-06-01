import type { ProviderResult, TreeDataProvider, TreeView, TreeViewOptions } from 'vscode'
import { EventEmitter, window } from 'vscode'
import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watch } from '@vue/runtime-core'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

export interface TreeViewNode {
  readonly children?: ProviderResult<this[]>
}

export type UseTreeViewOptions<T> =
  | (
    & Omit<TreeViewOptions<T>, 'treeDataProvider'>
    & Pick<TreeDataProvider<T>, 'getTreeItem' | 'resolveTreeItem'>
  )
  | TreeDataProvider<T>['getTreeItem']

export type TreeViewWithoutParent<T> = Omit<TreeView<T>, 'reveal'>

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
      },
    }))
  },
  viewId => viewId,
)
