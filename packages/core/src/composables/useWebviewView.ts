import type { WebviewOptions, WebviewView } from 'vscode'
import { window } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { shallowRef, toValue, watchEffect } from '../reactivity'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'

type WebviewRegisterOptions = Parameters<typeof window.registerWebviewViewProvider>[2] & {
  onDidReceiveMessage?: (message: any) => void
}

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
    registerOptions?: WebviewRegisterOptions,
  ) => {
    const view = shallowRef<WebviewView>()
    const context = shallowRef<unknown>()
    useDisposable(window.registerWebviewViewProvider(viewId, {
      resolveWebviewView(viewArg, contextArg) {
        view.value = viewArg
        context.value = contextArg
        if (registerOptions?.onDidReceiveMessage)
          viewArg.webview.onDidReceiveMessage(registerOptions.onDidReceiveMessage)
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
