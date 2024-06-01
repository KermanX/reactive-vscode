# Define Configurations

An extension can contribute extension-specific settings.

## Define in Manifest

To define the settings in the `package.json`, you need to add the `contributes.configuration` field. The `configuration` field is an object that contains the configuration settings.

```json
{
  "contributes": {
    "configuration": {
      "title": "My Extension",
      "properties": {
        "myExtension.enable": {
          "type": "boolean",
          "default": true,
          "description": "Enable My Extension"
        },
        "myExtension.greeting": {
          "type": ["string", "null"],
          "default": "Hello!",
          "description": "Greeting messag. Set to null to disable"
        }
      }
    }
  }
}
```

Visit the [official documentation](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration) for more information.

## Use in Extension

To use the settings in the extension, you can use the `reactive::defineConfigs` function to define the configuration. The following code is corresponding to the above configuration.

```ts
import { defineConfigs } from 'reactive-vscode'

const { enable, greeting } = defineConfigs('your-extension', {
  enable: Boolean,
  greeting: [String, null],
})
```

Note that you should always set the default value in the manifest file. `reactive::defineConfigs` does not provide default values.

In the above example, `enable` is of type `ConfigRef<boolean>`, which extends `Ref<boolean>`. Note that setting `enable.value` will not update the configuration. You should use `enable.update` instead.

```ts
import { defineConfigs } from 'reactive-vscode'

const { enable, greeting } = defineConfigs('your-extension', {
  enable: Boolean,
  greeting: [String, null],
})
// ---cut---
// This will not update the configuration. Only the value in the memory is changed.
enable.value = false

// This will write the value back to the configuration.
enable.update(false)
```

The `update` method also accepts `configurationTarget` and `overrideInLanguage` options. Visit the [official documentation](https://code.visualstudio.com/api/references/vscode-api#WorkspaceConfiguration.update) for more information.
