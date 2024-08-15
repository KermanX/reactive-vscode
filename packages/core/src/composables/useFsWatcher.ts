import type { MaybeRefOrGetter, ShallowReactive } from '@reactive-vscode/reactivity'
import { onScopeDispose, shallowReactive, toValue, watchEffect } from '@reactive-vscode/reactivity'
import type { Event, FileSystemWatcher, GlobPattern, Uri } from 'vscode'
import { workspace } from 'vscode'
import type { MaybeNullableRefOrGetter } from '../utils'
import { useEventEmitter } from './useEventEmitter'

export interface UseFSWatcher {
  readonly watchers: ShallowReactive<Map<GlobPattern, FileSystemWatcher>>
  readonly onDidCreate: Event<Uri>
  readonly onDidChange: Event<Uri>
  readonly onDidDelete: Event<Uri>
}

/**
 * @reactive `workspace.createFileSystemWatcher`
 */
export function useFsWatcher(
  globPattern: MaybeRefOrGetter<GlobPattern | readonly GlobPattern[] | ReadonlySet<GlobPattern>>,
  ignoreCreateEvents?: MaybeNullableRefOrGetter<boolean>,
  ignoreChangeEvents?: MaybeNullableRefOrGetter<boolean>,
  ignoreDeleteEvents?: MaybeNullableRefOrGetter<boolean>,
): UseFSWatcher {
  const watchers = shallowReactive(new Map<GlobPattern, FileSystemWatcher>())
  const createEmitter = useEventEmitter<Uri>()
  const changeEmitter = useEventEmitter<Uri>()
  const deleteEmitter = useEventEmitter<Uri>()

  watchEffect(() => {
    const globPatternValue = toValue(globPattern)
    const newPatterns = Array.isArray(globPatternValue)
      ? globPatternValue
      : globPatternValue instanceof Set
        ? Array.from(globPatternValue)
        : [globPatternValue]
    for (const [pattern, watcher] of watchers) {
      if (!newPatterns.includes(pattern)) {
        watcher.dispose()
        watchers.delete(pattern)
      }
    }
    for (const pattern of newPatterns) {
      if (!watchers.has(pattern)) {
        const w = workspace.createFileSystemWatcher(
          pattern,
          toValue(ignoreCreateEvents) || false,
          toValue(ignoreChangeEvents) || false,
          toValue(ignoreDeleteEvents) || false,
        )
        w.onDidCreate(createEmitter.fire)
        w.onDidChange(changeEmitter.fire)
        w.onDidDelete(deleteEmitter.fire)
      }
    }
  })

  onScopeDispose(() => {
    for (const watcher of watchers.values()) {
      watcher.dispose()
    }
    watchers.clear()
  })

  return {
    watchers,
    onDidCreate: createEmitter.event,
    onDidChange: changeEmitter.event,
    onDidDelete: deleteEmitter.event,
  }
}
