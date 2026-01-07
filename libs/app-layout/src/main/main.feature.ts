import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

/**
 * The main layout.
 */
@Component({
	selector: 'app-main',
	templateUrl: './main.feature.html',
	styleUrl: './main.feature.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet],
})
export class MainFeature {}
