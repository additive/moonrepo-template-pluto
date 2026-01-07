import { type ApplicationConfig, InjectionToken, provideAppInitializer } from '@angular/core'

import type { MoonProject } from './schemas'

export const MOON_PROJECT = new InjectionToken<MoonProject>('Moon project')

/**
 * Provide initial env value for moon project app configuration.
 */
export function provideMoonProject(): ApplicationConfig['providers'] {
	const config = MOON_PROJECT_JSON as MoonProject

	return [
		{
			provide: MOON_PROJECT,
			useValue: config,
		},
		provideAppInitializer(() => {
			// For example:
			// sentry.setContext('customer', {
			// 	name: config.metadata.customerName,
			// })
		}),
	]
}
