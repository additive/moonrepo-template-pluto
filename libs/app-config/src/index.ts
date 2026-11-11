import {
	type ApplicationConfig,
	CSP_NONCE,
	provideBrowserGlobalErrorListeners,
} from '@angular/core'

import { provideHttp } from '@pluto/http/provide-http'
import { provideI18n } from '@pluto/i18n'
import { provideMoonProject } from '@pluto/moon-project'

import { provideCore } from './provide-core'

/**
 * Providers every app shares. An app merges its own (environment, routes) on top.
 */
export const appConfig: ApplicationConfig = {
	// Order matters: later providers inject the earlier ones.
	providers: [
		provideBrowserGlobalErrorListeners(),
		{
			provide: CSP_NONCE,
			useValue: NONCE,
		},
		provideMoonProject(),
		provideHttp(),
		provideI18n(),
		provideCore(),
	],
}
