import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { toValue, watch } from '@reactive-vscode/reactivity'
import type { TreeDataProvider, TreeView, TreeViewOptions, ViewBadge } from 'vscode'
import { EventEmitter, window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'
import { useViewBadge } from './useViewBadge'
import { useViewTitle } from './useViewTitle'

export interface TreeViewNode {
  readonly children?: this[]
}

export type UseTreeViewOptions<T> =
  | (
    & Omit<TreeViewOptions<T>, 'treeDataProvider'>
    & Pick<TreeDataProvider<T>, 'getTreeItem' | 'resolveTreeItem'>
    & {
      title?: MaybeRefOrGetter<string | undefined>
      badge?: MaybeRefOrGetter<ViewBadge | undefined>
    }
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

    const view = useDisposable(window.createTreeView(viewId, {
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

    if (normalizedOptions?.title)
      useViewTitle(view, normalizedOptions.title)

    if (normalizedOptions?.badge)
      useViewBadge(view, normalizedOptions.badge)

    return view
  },
  viewId => viewId,
)
