import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'

/**
 * Welcome feature - landing page for Pluto.
 */
@Component({
	selector: 'app-feature-welcome',
	templateUrl: './welcome.feature.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FaIconComponent],
})
export class WelcomeFeature {}
