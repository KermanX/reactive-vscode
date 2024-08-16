export enum TextDocumentSaveReason {

  /**
   * Manually triggered, e.g. by the user pressing save, by starting debugging,
   * or by an API call.
   */
  Manual = 1,

  /**
   * Automatic after a delay.
   */
  AfterDelay = 2,

  /**
   * When the editor lost focus.
   */
  FocusOut = 3,
}
