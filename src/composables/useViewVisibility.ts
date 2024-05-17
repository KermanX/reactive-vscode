import type { ComputedRef, MaybeRefOrGetter } from '@vue/runtime-core'
import { computed, ref, toValue, watchEffect } from '@vue/runtime-core'
import type { TreeView, WebviewView } from 'vscode'
import type { Nullable } from '../utils/types'

type ViewWithVisibility = Pick<TreeView<unknown> | WebviewView, 'visible' | 'onDidChangeVisibility'>

export function useViewVisibility(view: MaybeRefOrGetter<Nullable<ViewWithVisibility>>): ComputedRef<boolean> {
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

  // Visiblility should be readonly
  return computed(() => !!visible.value)
}
