import type { Ref } from '@reactive-vscode/reactivity'

export type Nullable<T> = T | null | undefined

export type MaybeNullableRefOrGetter<T> = T | Ref<Nullable<T>> | (() => Nullable<T>)

export type Awaitable<T> = T | Promise<T>

// Should be `WatchSource | ... | any`
export type AnyWatchSource = any
