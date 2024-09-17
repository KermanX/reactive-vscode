import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { ref, shallowRef, toValue, watchEffect } from '@reactive-vscode/reactivity'
import type { WebviewOptions } from 'vscode'
import { window } from 'vscode'
import { useDisposable } from './useDisposable'
import { useViewTitle } from './useViewTitle'

export interface WebviewPanelRegisterOptions {
  enableFindWidget?: boolean
  retainContextWhenHidden?: boolean
  onDidReceiveMessage?: (message: any) => void
  webviewOptions?: MaybeRefOrGetter<WebviewOptions>
}

/**
 * Register a webview panel. See `vscode::window.createWebviewPanel`.
 *
 * @category view
 */
export function useWebviewPanel(
  viewType: string,
  title: MaybeRefOrGetter<string>,
  html: MaybeRefOrGetter<string>,
  showOptions: Parameters<typeof window.createWebviewPanel>[2],
  options?: WebviewPanelRegisterOptions,
) {
  const context = shallowRef<unknown>()
  const panel = useDisposable(window.createWebviewPanel(
    viewType,
    toValue(title),
    showOptions,
    {
      enableFindWidget: options?.enableFindWidget,
      retainContextWhenHidden: options?.retainContextWhenHidden,
      ...toValue(options?.webviewOptions),
    },
  ))

  if (options?.onDidReceiveMessage)
    panel.webview.onDidReceiveMessage(options.onDidReceiveMessage)

  const forceRefreshId = ref(0)

  function forceRefresh() {
    forceRefreshId.value++
  }

  watchEffect(() => {
    panel.webview.html = `${toValue(html)}<!--${forceRefreshId.value}-->`
  })

  if (options?.webviewOptions) {
    const webviewOptions = options.webviewOptions
    watchEffect(() => {
      panel.webview.options = toValue(webviewOptions)
    })
  }

  useViewTitle(panel, title)

  function postMessage(message: any) {
    return panel.webview.postMessage(message)
  }

  const active = ref(panel.active)
  const visible = ref(panel.visible)
  useDisposable(panel.onDidChangeViewState(() => {
    active.value = panel.active
    visible.value = panel.visible
  }))

  return { panel, context, active, visible, postMessage, forceRefresh }
}
