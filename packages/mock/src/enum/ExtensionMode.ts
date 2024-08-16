export enum ExtensionMode {
  /**
   * The extension is installed normally (for example, from the marketplace
   * or VSIX) in the editor.
   */
  Production = 1,

  /**
   * The extension is running from an `--extensionDevelopmentPath` provided
   * when launching the editor.
   */
  Development = 2,

  /**
   * The extension is running from an `--extensionTestsPath` and
   * the extension host is running unit tests.
   */
  Test = 3,
}
