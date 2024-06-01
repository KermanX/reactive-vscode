# Define Views

Views are an important part of a VSCode extension. There are two types of views in VSCode: [Tree View](https://code.visualstudio.com/api/extension-guides/tree-view) and [Webview](https://code.visualstudio.com/api/extension-guides/webview). Please read the [official UX guidelines](https://code.visualstudio.com/api/ux-guidelines/views) for a basic understanding.

## Define in Manifest

As described in the [official documentation](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers), first, you need view containers to be defined in the `contributes.viewsContainers.[viewContainerType]` section in the `package.json`. Then you can define your views in the `contributes.views.[viewContainerId]` section.

```json
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "package-explorer",
          "title": "Package Explorer",
          "icon": "resources/package-explorer.svg"
        }
      ]
    },
    "views": {
      "package-explorer": [
        {
          "id": "package-dependencies",
          "name": "Dependencies"
        },
        {
          "id": "package-outline",
          "name": "Outline"
        }
      ]
    }
  }
}
```

![Custom views container](https://code.visualstudio.com/assets/api/references/contribution-points/custom-views-container.png)

## Tree View

[Tree views](https://code.visualstudio.com/api/extension-guides/tree-view) are used to display hierarchical data. You can define a tree view by using the `reactive::useTreeView` function.

Here is an example of a tree view:

```ts
import { computed, createSingletonComposable, useTreeView } from 'reactive-vscode'
import { TreeItemCollapsibleState } from 'vscode'

export const useDemoTreeView = createSingletonComposable(() => {
  const rootNodes = computed(() => [
    { data: 1, children: [{ data: 2 }] },
    { data: 3 },
  ])
  // return anything you want to expose
  return useTreeView(
    'reactive-tree-view',
    rootNodes,
    {
      getTreeItem(node) {
        return {
          label: `Item ${node.data}`,
          collapsibleState: node.children?.length ? TreeItemCollapsibleState.Expanded : TreeItemCollapsibleState.None,
        }
      },
    },
  )
})
```

Then you can call the `useDemoTreeView` function every where to register the tree view and get the returned value.

The `children` property in nodes is used to define the children of the node. Other properties are user-defined and can be used in the `getTreeItem` function. The `getTreeItem` function returns a `vscode::TreeItem` object from a node.

::: details About `reactive::createSingletonComposable`
`reactive::createSingletonComposable` is a helper function to create a singleton composable. It will only create the composable once and return the same instance every time it is called.
:::

::: warning
For the above example, `useDemoTreeView` should **not** be called top-level in the module, because the extension context is not available at that time. Instead, you should **always** call it in the `setup` function.
:::

## Webview

[Webviews](https://code.visualstudio.com/api/extension-guides/webview) are used to display web content in the editor. You can define a webview by using the `reactive::useWebviewView` function.

Here is an example of a webview:

```ts
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

  useWebviewView(
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

  return { message }
})
```

The time to call `useDemoWebviewView` is the same as the tree view in the previous section.
