import type { Signal, Type } from '@angular/core'

/**
 * Turn interface model to signal | input model.
 */
export type SignalModel<T> = {
	[K in keyof T]-?: Signal<T[K]>
}

/**
 * Unwrap Angular's Type type so we can get
 * the underlying type.
 */
export type UnwrapType<T> = T extends Type<infer R> ? R : never
