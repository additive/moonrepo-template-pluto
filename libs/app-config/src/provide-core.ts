import { type EnvironmentProviders, inject, provideAppInitializer } from '@angular/core'
import { format } from 'date-fns'

import { APP_ENVIRONMENT } from '@pluto/environment'

/**
 * Core services that the application cannot life without nor bootstrap
 * correctly. Async service should be provided in another app initializer.
 */
export function provideCore(): EnvironmentProviders {
	return provideAppInitializer(() => {
		const _environment = inject(APP_ENVIRONMENT)

		const _buildDate = format(BUILD_DATE, 'PP')
	})
}
