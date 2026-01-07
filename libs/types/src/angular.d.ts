/** biome-ignore-all lint/style/useConsistentTypeDefinitions: only interfaces can extend each other */

import type { CreateSignalOptions, WritableSignal } from '@angular/core'
import type { Observable } from 'rxjs'

/**
 * ! Read me: we are patching some Angular internals here !
 */

/**
 * We do not agree with the way Angular typed Signals. It would require much
 * more code to explicitly define `null` as the value of a Signal whereas
 * we conform to that `undefined` is the preferred way.
 */
declare module '@angular/core' {
	function signal<T>(initialValue: T, options?: CreateSignalOptions<T>): WritableSignal<T>
	function signal<T>(
		initialValue?: undefined,
		options?: CreateSignalOptions<T>,
	): WritableSignal<T | undefined>
}

/**
 * Same goes for interop functions.
 */
declare module '@angular/core/rxjs-interop' {
	function toSignal<T>(source: Observable<T>): Signal<T>
}
