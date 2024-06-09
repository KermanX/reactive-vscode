export { }
declare global {
  const __DEV__: boolean
  const window: typeof window
  const HTMLCanvasElement: any
  const HTMLImageElement: any
  const HTMLTextAreaElement: any
  const HTMLElement: any
  const Window: any
  const WindowEventMap: any
  const MediaSource: any
  const WebSocket: globalThis.WebSocket
  const Worker: globalThis.Worker
  const CloseEvent: any
  const MessageEvent: any
}
