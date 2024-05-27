import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { shallowRef, toValue, watchEffect } from '@vue/runtime-core'
import type { WebviewOptions, WebviewView } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * Register a webview view. See `vscode::window.registerWebviewViewProvider`.
 *
 * @category view
 */
export const useWebviewView = createKeyedComposable(
  (
    viewId: string,
    html: MaybeRefOrGetter<string>,
    webviewOptions?: MaybeRefOrGetter<WebviewOptions>,
    registerOptions?: Parameters<typeof window.registerWebviewViewProvider>[2],
  ) => {
    const view = shallowRef<WebviewView>()
    const context = shallowRef<unknown>()
    useDisposable(window.registerWebviewViewProvider(viewId, {
      resolveWebviewView(viewArg, contextArg) {
        view.value = viewArg
        context.value = contextArg
      },
    }, registerOptions))

    watchEffect(() => {
      if (view.value)
        view.value.webview.html = toValue(html)
    })

    if (webviewOptions) {
      watchEffect(() => {
        if (view.value)
          view.value.webview.options = toValue(webviewOptions)
      })
    }

    function postMessage(message: any) {
      return view.value?.webview.postMessage(message)
    }

    return { view, context, postMessage }
  },
  viewId => viewId,
)
