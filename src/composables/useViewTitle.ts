import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { toValue, watchEffect } from '@vue/runtime-core'
import type { TreeView, WebviewView } from 'vscode'

export function useViewTitle(
  view: MaybeRefOrGetter<TreeView<unknown> | WebviewView | null | undefined>,
  title: MaybeRefOrGetter<string | undefined>,
) {
  watchEffect(() => {
    const viewValue = toValue(view)
    if (viewValue)
      viewValue.title = toValue(title)
  })
}
