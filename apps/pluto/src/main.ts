/** biome-ignore-all lint/suspicious/noConsole: yes in bootstrap */

import { enableProdMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'

import { initSentry } from '@pluto/config/init-sentry'

import { AppComponent } from './app/app.component'
import { config } from './app/app.config'
import { environment } from './environments/environment'

initSentry(environment)

if (environment.production) {
	enableProdMode()
}

bootstrapApplication(AppComponent, config).catch((error) => {
	console.error('Error during bootstrap:', error)
})
