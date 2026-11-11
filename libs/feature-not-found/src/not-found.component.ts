import { Location } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { TranslocoPipe } from '@jsverse/transloco'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideArrowLeft } from '@ng-icons/lucide'
import { filter, firstValueFrom } from 'rxjs'

import { HlmButton } from '@pluto/helm/button'

/**
 * Page every unknown route redirects to, naming the URL that failed and leading back.
 */
@Component({
	selector: 'app-feature-not-found',
	templateUrl: './not-found.component.html',
	imports: [TranslocoPipe, NgIcon, HlmButton],
	providers: [provideIcons({ lucideArrowLeft })],
})
export class NotFoundFeature {
	private readonly location = inject(Location)
	private readonly router = inject(Router)

	protected readonly referrer = signal(document.referrer)

	constructor() {
		void firstValueFrom(
			this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
		).then((event) => {
			this.referrer.set(event.url)
		})
	}

	protected goBack(): void {
		if (this.referrer()) {
			this.location.back()
		} else {
			void this.router.navigateByUrl('/')
		}
	}
}
