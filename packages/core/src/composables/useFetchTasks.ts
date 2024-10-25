import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { TaskFilter } from 'vscode'
import { computed, toValue } from '@reactive-vscode/reactivity'
import { tasks } from 'vscode'

/**
 * @reactive `tasks.fetchTasks`
 */
export function useFetchTasks(filter?: MaybeRefOrGetter<TaskFilter | undefined>) {
  return computed(() => tasks.fetchTasks(toValue(filter)))
}
