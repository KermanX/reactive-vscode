import type { TreeView, ViewBadge, WebviewView } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { toValue, watchEffect } from '../reactivity'
import type { Nullable } from '../utils/types'

type ViewWithBadge = Pick<TreeView<unknown> | WebviewView, 'badge'>

/**
 * Reactively set the badge of a view (`vscode::TreeView` or `vscode::WebviewView`).
 *
 * @category view
 */
export function useViewBadge(
  view: MaybeRefOrGetter<Nullable<ViewWithBadge>>,
  title: MaybeRefOrGetter<ViewBadge | undefined>,
) {
  watchEffect(() => {
    const viewValue = toValue(view)
    if (viewValue)
      viewValue.badge = toValue(title)
  })
}
