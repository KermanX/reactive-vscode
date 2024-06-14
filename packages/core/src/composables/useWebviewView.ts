import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { shallowRef, toValue, watchEffect } from '@reactive-vscode/reactivity'
import type { ViewBadge, WebviewOptions, WebviewView } from 'vscode'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'
import { useViewBadge } from './useViewBadge'
import { useViewTitle } from './useViewTitle'

type WebviewRegisterOptions = Parameters<typeof window.registerWebviewViewProvider>[2] & {
  onDidReceiveMessage?: (message: any) => void
  webviewOptions?: MaybeRefOrGetter<WebviewOptions>
  title?: MaybeRefOrGetter<string | undefined>
  badge?: MaybeRefOrGetter<ViewBadge | undefined>
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
    options?: WebviewRegisterOptions,
  ) => {
    const view = shallowRef<WebviewView>()
    const context = shallowRef<unknown>()
    useDisposable(window.registerWebviewViewProvider(viewId, {
      resolveWebviewView(viewArg, contextArg) {
        view.value = viewArg
        context.value = contextArg
        if (options?.onDidReceiveMessage)
          viewArg.webview.onDidReceiveMessage(options.onDidReceiveMessage)
      },
    }, options))

    watchEffect(() => {
      if (view.value)
        view.value.webview.html = toValue(html)
    })

    if (options?.webviewOptions) {
      const webviewOptions = options.webviewOptions
      watchEffect(() => {
        if (view.value)
          view.value.webview.options = toValue(webviewOptions)
      })
    }

    if (options?.title)
      useViewTitle(view, options.title)

    if (options?.badge)
      useViewBadge(view, options.badge)

    function postMessage(message: any) {
      return view.value?.webview.postMessage(message)
    }

    return { view, context, postMessage }
  },
  viewId => viewId,
)
