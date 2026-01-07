import { type ApplicationConfig, mergeApplicationConfig } from '@angular/core'

import { appConfig } from '@pluto/config'
import { provideAppRouter } from '@pluto/config/provide-router'
import { APP_ENVIRONMENT } from '@pluto/environment'

import { environment } from '../environments/environment'
import routes from './app.routes'

const clientConfig = {
	providers: [
		{
			provide: APP_ENVIRONMENT,
			useValue: environment,
		},
		provideAppRouter(routes),
	],
} satisfies ApplicationConfig

export const config = mergeApplicationConfig(appConfig, clientConfig)
