import type { TreeDataProvider, TreeView, TreeViewOptions } from 'vscode'
import { EventEmitter, window } from 'vscode'
import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watch } from '@vue/runtime-core'
import { createKeyedComposable } from '../utils/keyedComposable'
import { useDisposable } from './useDisposable'

export interface TreeViewNode<T> {
  readonly element: T
  readonly children: TreeViewNode<T>[]
}

type UseTreeViewOptions<T> =
  | (
    & Omit<TreeViewOptions<T>, 'treeDataProvider'>
    & Pick<TreeDataProvider<T>, 'getTreeItem' | 'resolveTreeItem'>
  )
  | TreeDataProvider<T>['getTreeItem']

type TreeViewWithoutParent<T> = Omit<TreeView<T>, 'reveal'>

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

export interface TreeViewNodeWithParent<T> extends TreeViewNode<T> {
  readonly parent?: TreeViewNodeWithParent<T>
}

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
