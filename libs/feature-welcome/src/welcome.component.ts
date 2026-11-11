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
	/** The feature cards: translation key segment and the accent that tints the card. */
	protected readonly cards = [
		{
			key: 'modern',
			tint: 'border-nebula/25 bg-nebula/10 hover:border-nebula/50',
			title: 'text-nebula',
		},
		{
			key: 'monorepo',
			tint: 'border-comet/25 bg-comet/10 hover:border-comet/50',
			title: 'text-comet',
		},
		{ key: 'ui', tint: 'border-star/25 bg-star/10 hover:border-star/50', title: 'text-star' },
	] as const
}
