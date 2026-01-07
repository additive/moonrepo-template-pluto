import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { RouterMenusService } from 'angular-router-menus'

/**
 * The main layout.
 */
@Component({
	selector: 'app-main',
	templateUrl: './main.feature.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, RouterLinkActive, NgOptimizedImage],
})
export class MainFeature {
	readonly menu = inject(RouterMenusService).use('main')
}
