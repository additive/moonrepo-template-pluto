import {
	type ApplicationConfig,
	CSP_NONCE,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from '@angular/core'

import { provideHttp } from '@pluto/http/provide-http'
import { provideMoonProject } from '@pluto/moon-project'
import { provideIcons } from '@pluto/ui-icons/provide-icons'

import { provideCore } from './provide-core'

export const appConfig: ApplicationConfig = {
	/**
	 * Order is important!
	 */
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		{
			provide: CSP_NONCE,
			useValue: NONCE,
		},
		provideMoonProject(),
		provideHttp(),
		provideCore(),
		provideIcons(),
	],
}
