import { computed, createSingletonComposable, ref, useWebviewView } from 'reactive-vscode'

export const useDemoWebviewView = createSingletonComposable(() => {
  const message = ref('')
  const html = computed(() => `
  <script>
    vscode = acquireVsCodeApi()
    function updateMessage() {
      vscode.postMessage({
        type: 'updateMessage',
        message: document.querySelector('input').value,
      })
    }
  </script>
  <p>${message.value}</p>
  <div style="display:flex; flex-wrap:wrap;">
    <input type="text" placeholder="Input Message" />
    <button onclick="updateMessage()">Update Message</button>
  </div>
  `)

  const { postMessage } = useWebviewView(
    'reactive-webview-view',
    /* html content, can be computed */ html,
    /* webviewOptions, can be computed */ {
      enableScripts: true,
      enableCommandUris: true,
    },
    /* registerOptions, static */ {
      onDidReceiveMessage(ev) {
        if (ev.type === 'updateMessage')
          message.value = ev.message
      },
    },
  )

  return { message, postMessage }
})
