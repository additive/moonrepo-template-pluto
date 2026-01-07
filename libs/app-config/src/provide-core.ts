import { type EnvironmentProviders, inject, provideAppInitializer } from '@angular/core'
import { format } from 'date-fns'

import { APP_ENVIRONMENT } from '@pluto/environment'

/**
 * Core services that the application cannot life without nor bootstrap
 * correctly. Async service should be provided in another app initializer.
 */
export function provideCore(): EnvironmentProviders {
	return provideAppInitializer(() => {
		const environment = inject(APP_ENVIRONMENT)

		const buildDate = format(BUILD_DATE, 'PP')
		log.info(StackCore.BOOTSTRAP, `Pluto v${APP_VERSION} (${APP_HASH})`)
		log.info(StackCore.BOOTSTRAP, `Build ${BUILD_ENV} at ${buildDate}`)
		log.debug(StackCore.BOOTSTRAP, 'Mode:', environment.production)
	})
}
