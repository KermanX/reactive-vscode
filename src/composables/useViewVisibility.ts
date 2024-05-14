import type { Ref } from '@vue/runtime-core'
import { readonly, ref } from '@vue/runtime-core'
import type { TreeView, WebviewView } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

type ViewWithVisibility = TreeView<unknown> | WebviewView

const map = new WeakMap<ViewWithVisibility, Readonly<Ref<boolean>>>()

export const useViewVisibility = createKeyedComposable(
  (view: ViewWithVisibility) => {
    const existing = map.get(view)
    if (existing)
      return existing

    const visible = ref(view.visible)
    useDisposable(view.onDidChangeVisibility(() => visible.value = view.visible))

    const result = readonly(visible)
    map.set(view, result)
    return result
  },
  view => view,
)
