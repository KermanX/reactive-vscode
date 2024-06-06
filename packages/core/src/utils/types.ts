import type { Ref } from '../reactivity'

export type Nullable<T> = T | null | undefined

export type MaybeNullableRefOrGetter<T> = T | Ref<Nullable<T>> | (() => Nullable<T>)
