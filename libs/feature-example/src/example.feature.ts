import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'

/**
 * Example feature.
 */
@Component({
	selector: 'app-feature-example',
	templateUrl: './example.feature.html',
	styleUrl: './example.feature.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FaIconComponent],
})
export class ExampleFeature {}
