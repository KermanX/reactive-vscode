import type { QuickInputButton, QuickPickItem } from 'vscode'
import { window } from 'vscode'
import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { shallowRef, toValue, watchEffect } from '@reactive-vscode/reactivity'
import { useDisposable } from './useDisposable'
import { useEvent } from './useEvent'

export interface QuickPickOptions<T extends QuickPickItem> {
  /**
   * Items to pick from. This can be read and updated by the extension.
   */
  items?: MaybeRefOrGetter<readonly T[]>

  /**
   * Buttons for actions in the UI.
   */
  buttons?: MaybeRefOrGetter<readonly QuickInputButton[]>

  /**
   * An optional title.
   */
  title?: MaybeRefOrGetter<string | undefined>

  /**
   * An optional current step count.
   */
  step?: MaybeRefOrGetter<number | undefined>

  /**
   * An optional total step count.
   */
  totalSteps?: MaybeRefOrGetter<number | undefined>

  /**
   * If the UI should allow for user input. Defaults to true.
   *
   * Change this to false, e.g., while validating user input or
   * loading data for the next step in user input.
   */
  enabled?: MaybeRefOrGetter<boolean>

  /**
   * If the UI should show a progress indicator. Defaults to false.
   *
   * Change this to true, e.g., while loading more data or validating
   * user input.
   */
  busy?: MaybeRefOrGetter<boolean>

  /**
   * If the UI should stay open even when loosing UI focus. Defaults to false.
   * This setting is ignored on iPad and is always false.
   */
  ignoreFocusOut?: MaybeRefOrGetter<boolean>

  /**
   * Optional placeholder shown in the filter textbox when no filter has been entered.
   */
  placeholder?: MaybeRefOrGetter<string | undefined>

  /**
   * If multiple items can be selected at the same time. Defaults to false.
   */
  canSelectMany?: MaybeRefOrGetter<boolean>

  /**
   * If the filter text should also be matched against the description of the items. Defaults to false.
   */
  matchOnDescription?: MaybeRefOrGetter<boolean>

  /**
   * If the filter text should also be matched against the detail of the items. Defaults to false.
   */
  matchOnDetail?: MaybeRefOrGetter<boolean>

  /**
   * An optional flag to maintain the scroll position of the quick pick when the quick pick items are updated. Defaults to false.
   */
  keepScrollPosition?: MaybeRefOrGetter<boolean>

  /**
   * Initial value of the filter text.
   */
  value?: string

  /**
   * Initial active items. This can be read and updated by the extension.
   */
  activeItems?: readonly T[]

  /**
   * Initial selected items. This can be read and updated by the extension.
   */
  selectedItems?: readonly T[]
}

/**
 * Creates a customizable quick pick UI.
 *
 * @reactive `window.createQuickPick`
 */
export function useQuickPick<T extends QuickPickItem>(
  options: QuickPickOptions<T> = {},
) {
  const quickPick = useDisposable(window.createQuickPick<T>())

  const onDidChangeActive = useEvent(quickPick.onDidChangeActive)
  const onDidChangeSelection = useEvent(quickPick.onDidChangeSelection)
  const onDidAccept = useEvent(quickPick.onDidAccept)
  const onDidHide = useEvent(quickPick.onDidHide)
  const onDidTriggerButton = useEvent(quickPick.onDidTriggerButton)
  const onDidChangeValue = useEvent(quickPick.onDidChangeValue)

  ;([
    'items',
    'buttons',
    'title',
    'step',
    'totalSteps',
    'enabled',
    'busy',
    'ignoreFocusOut',
    'placeholder',
    'canSelectMany',
    'matchOnDescription',
    'matchOnDetail',
    'keepScrollPosition',
  ] as const).forEach((key) => {
    if (options[key])
      // @ts-expect-error index signature
      watchEffect(() => quickPick[key] = toValue(options[key]))
  })

  if (options.value)
    quickPick.value = options.value
  const value = shallowRef<string>(quickPick.value)
  onDidChangeValue(v => value.value = v)

  if (options.activeItems)
    quickPick.activeItems = options.activeItems
  const activeItems = shallowRef<readonly T[]>(quickPick.activeItems)
  onDidChangeActive(items => activeItems.value = items)

  if (options.selectedItems)
    quickPick.selectedItems = options.selectedItems
  const selectedItems = shallowRef<readonly T[]>(quickPick.selectedItems)
  onDidChangeSelection(items => selectedItems.value = items)

  return {
    ...quickPick,
    onDidChangeActive,
    onDidChangeSelection,
    onDidAccept,
    onDidHide,
    onDidTriggerButton,
    onDidChangeValue,
    value,
    activeItems,
    selectedItems,
  }
}
