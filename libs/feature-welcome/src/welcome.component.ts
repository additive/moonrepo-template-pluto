import { Component } from '@angular/core'
import { TranslocoPipe } from '@jsverse/transloco'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideMoon, lucideSparkles } from '@ng-icons/lucide'

import {
	HlmCard,
	HlmCardContent,
	HlmCardDescription,
	HlmCardHeader,
	HlmCardTitle,
} from '@pluto/helm/card'

/**
 * Landing page of the template, introducing the stack it ships with.
 */
@Component({
	selector: 'app-feature-welcome',
	templateUrl: './welcome.component.html',
	imports: [
		NgIcon,
		TranslocoPipe,
		HlmCard,
		HlmCardHeader,
		HlmCardTitle,
		HlmCardDescription,
		HlmCardContent,
	],
	providers: [provideIcons({ lucideMoon, lucideSparkles })],
})
export class WelcomeFeature {
	/** Translation key segments of the feature cards. */
	protected readonly cards = ['modern', 'monorepo', 'ui'] as const
}
