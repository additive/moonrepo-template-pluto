import { NgOptimizedImage } from '@angular/common'
import { Component, computed, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { lucideLanguages } from '@ng-icons/lucide'
import { RouterMenusService } from 'angular-router-menus'

import { HlmButton } from '@pluto/helm/button'
import { Language, languageNames } from '@pluto/i18n'

/**
 * The app shell: brand, main menu and language switch above the routed page. Every route
 * under `/pluto` renders inside it.
 */
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	imports: [
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		NgOptimizedImage,
		NgIcon,
		HlmButton,
		TranslocoPipe,
	],
	providers: [provideIcons({ lucideLanguages })],
})
export class MainFeature {
	private readonly transloco = inject(TranslocoService)
	private readonly language = toSignal(this.transloco.langChanges$, {
		initialValue: this.transloco.getActiveLang(),
	})
	private readonly nextLanguage = computed(() =>
		this.language() === Language.German ? Language.English : Language.German,
	)

	protected readonly menu = inject(RouterMenusService).use('main')
	protected readonly nextLanguageName = computed(() => languageNames[this.nextLanguage()])

	protected toggleLanguage(): void {
		this.transloco.setActiveLang(this.nextLanguage())
	}
}
