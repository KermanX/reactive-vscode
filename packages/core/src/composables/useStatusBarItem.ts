import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { StatusBarAlignment, StatusBarItem } from 'vscode'
import { toValue, watchEffect } from '@reactive-vscode/reactivity'
import { window } from 'vscode'
import { useDisposable } from './useDisposable'

export interface UseStatusBarItemOptions {
  id?: string
  alignment?: StatusBarAlignment
  priority?: number
  name?: MaybeRefOrGetter<StatusBarItem['name']>
  text?: MaybeRefOrGetter<StatusBarItem['text']>
  tooltip?: MaybeRefOrGetter<StatusBarItem['tooltip']>
  color?: MaybeRefOrGetter<StatusBarItem['color']>
  backgroundColor?: MaybeRefOrGetter<StatusBarItem['backgroundColor']>
  command?: MaybeRefOrGetter<StatusBarItem['command']>
  accessibilityInformation?: MaybeRefOrGetter<StatusBarItem['accessibilityInformation']>
}

/**
 * @reactive `window.createStatusBarItem`
 */
export function useStatusBarItem(options: UseStatusBarItemOptions): StatusBarItem {
  const item = useDisposable(options.id
    ? window.createStatusBarItem(options.id, options.alignment, options.priority)
    : window.createStatusBarItem(options.alignment, options.priority))

  function reactivelySet(key: string) {
    const value = (options as any)[key]
    if (value != null)
      watchEffect(() => (item as any)[key] = toValue(value))
  }

  [
    'name',
    'text',
    'tooltip',
    'color',
    'backgroundColor',
    'command',
    'accessibilityInformation',
  ].forEach(reactivelySet)

  return item
}
