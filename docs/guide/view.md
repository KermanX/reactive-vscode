# Define Views

Views are an important part of a VSCode extension. There are two types of views in VSCode: [Tree View](https://code.visualstudio.com/api/extension-guides/tree-view) and [Webview](https://code.visualstudio.com/api/extension-guides/webview).

## Define in Manifest

First, you need view containers to be defined in the `contributes.viewsContainers.[viewContainerType]` section in the `package.json`. Then you can define your views in the `contributes.views.[viewContainerId]` section.

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

Visit the [official documentation](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers) for more information.

## Tree View

Tree views are used to display hierarchical data. You can define a tree view by using the `reactive::useTreeView` or `reactive::useTreeViewWithParent` function.
