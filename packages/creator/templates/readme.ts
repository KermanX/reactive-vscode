export default (displayName: string) => `# ${displayName}

An VS Code extension created with [Reactive VS Code](https://kermanx.github.io/reactive-vscode/).

## What's in the folder

* \`package.json\` - this is the manifest file in which you declare your extension and command.
* \`src/extension.ts\` - this is the main file where you write your extension.

## Get up and running straight away

* Run \`npm run dev\` in a terminal to compile the extension.
* Press \`F5\` to open a new window with your extension loaded.
* Run your command from the command palette by pressing (\`Ctrl+Shift+P\` or \`Cmd+Shift+P\` on Mac) and typing \`Hello World\`.
* Set breakpoints in your code inside \`src/extension.ts\` to debug your extension.
* Find output from your extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in \`src/extension.ts\`.
* You can also reload (\`Ctrl+R\` or \`Cmd+R\` on Mac) the VS Code window with your extension to load your changes.

## Go further

* [Follow UX guidelines](https://code.visualstudio.com/api/ux-guidelines/overview) to create extensions that seamlessly integrate with VS Code's native interface and patterns.
 * Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
 * [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.
 * Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
`
