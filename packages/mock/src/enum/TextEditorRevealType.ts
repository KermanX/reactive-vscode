export enum TextEditorRevealType {
  /**
   * The range will be revealed with as little scrolling as possible.
   */
  Default = 0,
  /**
   * The range will always be revealed in the center of the viewport.
   */
  InCenter = 1,
  /**
   * If the range is outside the viewport, it will be revealed in the center of the viewport.
   * Otherwise, it will be revealed with as little scrolling as possible.
   */
  InCenterIfOutsideViewport = 2,
  /**
   * The range will always be revealed at the top of the viewport.
   */
  AtTop = 3,
}
