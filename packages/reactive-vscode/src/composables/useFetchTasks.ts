import type { MaybeRefOrGetter } from '@vue/runtime-core'
import { computed, toValue } from '@vue/runtime-core'
import type { TaskFilter } from 'vscode'
import { tasks } from 'vscode'

export function useFetchTasks(filter?: MaybeRefOrGetter<TaskFilter | undefined>) {
  return computed(() => tasks.fetchTasks(toValue(filter)))
}
