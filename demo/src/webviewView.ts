import { computed, createSingletonComposable, useWebviewView } from 'reactive-vscode'
import { message } from './configs'
import { calledTimes } from './states'

export const useDemoWebviewView = createSingletonComposable(() => {
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
  <h1>Webview View</h1>
  <p>${message.value} for ${calledTimes.value} times</p>
  <p><a href="command:reactive-vscode-demo.helloWorld">Say Hello World</a></p>
  <div style="display:flex; flex-wrap:wrap;">
    <input type="text" placeholder="Greeting Message" />
    <button onclick="updateMessage()">Update Message</button>
  </div>
  `)

  return useWebviewView(
    'reactive-webview-view',
    html,
    {
      enableScripts: true,
      enableCommandUris: true,
    },
    {
      onDidReceiveMessage(ev) {
        if (ev.type === 'updateMessage')
          message.value = ev.message
      },
    },
  )
})
