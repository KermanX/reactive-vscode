import type { TaskFilter } from 'vscode'
import { tasks } from 'vscode'
import type { MaybeRefOrGetter } from '../reactivity'
import { computed, toValue } from '../reactivity'

/**
 * @reactive `tasks.fetchTasks`
 */
export function useFetchTasks(filter?: MaybeRefOrGetter<TaskFilter | undefined>) {
  return computed(() => tasks.fetchTasks(toValue(filter)))
}
