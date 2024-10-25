import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { ViewBadge, WebviewOptions, WebviewView, WebviewViewResolveContext } from 'vscode'
import { ref, shallowRef, toValue, watchEffect } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
import { createKeyedComposable } from '../utils'
import { useDisposable } from './useDisposable'
import { useViewBadge } from './useViewBadge'
import { useViewTitle } from './useViewTitle'

export interface WebviewViewRegisterOptions {
  retainContextWhenHidden?: boolean
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
    options?: WebviewViewRegisterOptions,
  ) => {
    const view = shallowRef<WebviewView>()
    const context = shallowRef<WebviewViewResolveContext>()
    useDisposable(window.registerWebviewViewProvider(
      viewId,
      {
        resolveWebviewView(viewArg, contextArg) {
          view.value = viewArg
          context.value = contextArg
          if (options?.onDidReceiveMessage)
            viewArg.webview.onDidReceiveMessage(options.onDidReceiveMessage)
        },
      },
      {
        webviewOptions: {
          retainContextWhenHidden: options?.retainContextWhenHidden,
        },
      },
    ))

    const forceRefreshId = ref(0)

    function forceRefresh() {
      forceRefreshId.value++
    }

    watchEffect(() => {
      if (view.value)
        view.value.webview.html = `${toValue(html)}<!--${forceRefreshId.value}-->`
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

    return { view, context, postMessage, forceRefresh }
  },
  viewId => viewId,
)
