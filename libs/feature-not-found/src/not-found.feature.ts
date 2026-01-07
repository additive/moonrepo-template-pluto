import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter, firstValueFrom } from 'rxjs'

/**
 * Show this page on any routing error!
 */
@Component({
	selector: 'app-feature-not-found',
	templateUrl: './not-found.feature.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundFeature {
	private readonly location = inject(Location)
	private readonly router = inject(Router)

	referrer = document.referrer

	constructor() {
		void firstValueFrom(
			this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
		).then((event) => {
			this.referrer = event.url
		})
	}

	goBackToRef(): void {
		if (this.referrer) {
			this.location.back()
		} else {
			void this.router.navigateByUrl('/')
		}
	}
}
