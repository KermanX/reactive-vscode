import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watchEffect } from '@vue/runtime-core'
import type { TreeView, ViewBadge, WebviewView } from 'vscode'
import type { Nullable } from '../utils/types'

type ViewWithBadge = Pick<TreeView<unknown> | WebviewView, 'badge'>

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