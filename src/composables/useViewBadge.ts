import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watchEffect } from '@vue/runtime-core'
import type { TreeView, ViewBadge, WebviewView } from 'vscode'

export function useViewBadge(
  view: MaybeRefOrGetter<TreeView<unknown> | WebviewView | null | undefined>,
  title: MaybeRefOrGetter<ViewBadge | undefined>,
) {
  watchEffect(() => {
    const viewValue = toValue(view)
    if (viewValue)
      viewValue.badge = toValue(title)
  })
}
