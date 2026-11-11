import { bootstrapApplication } from '@angular/platform-browser'

import { AppComponent } from './app/app.component'
import { config } from './app/app.config'

try {
	await bootstrapApplication(AppComponent, config)
} catch (error) {
	console.error('Error during bootstrap:', error)
}
