import type { ComputedRef } from '@reactive-vscode/reactivity'
import type { TreeView, WebviewView } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils/types'
import { computed, ref, toValue, watchEffect } from '@reactive-vscode/reactivity'

type ViewWithVisibility = Pick<TreeView<unknown> | WebviewView, 'visible' | 'onDidChangeVisibility'>

/**
 * Reactively get the visibility of a view (`vscode::TreeView` or `vscode::WebviewView`).
 *
 * @category view
 */
export function useViewVisibility(view: MaybeNullableRefOrGetter<ViewWithVisibility>): ComputedRef<boolean> {
  const visible = ref(toValue(view)?.visible)

  function update() {
    visible.value = toValue(view)?.visible
  }

  watchEffect((onCleanup) => {
    const viewValue = toValue(view)
    if (viewValue) {
      const disposable = viewValue.onDidChangeVisibility(update)
      onCleanup(() => disposable.dispose())
    }
  })

  watchEffect(update)

  // Visibility should be readonly
  return computed(() => !!visible.value)
}
