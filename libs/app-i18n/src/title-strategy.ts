import { Injectable, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Title } from '@angular/platform-browser'
import { type RouterStateSnapshot, TitleStrategy } from '@angular/router'
import { TranslocoService } from '@jsverse/transloco'
import { BehaviorSubject, combineLatest, of, switchMap } from 'rxjs'

/**
 * Reads a route's `title` as a translation key and keeps the document title in the active
 * language, also after a language switch. Provided by `provideI18n`.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
	private readonly key$ = new BehaviorSubject<string | undefined>(undefined)

	constructor() {
		super()
		const title = inject(Title)
		const transloco = inject(TranslocoService)

		combineLatest([this.key$, transloco.langChanges$])
			.pipe(
				switchMap(([key, lang]) => (key ? transloco.selectTranslate(key, {}, lang) : of(''))),
				takeUntilDestroyed(),
			)
			.subscribe((text: string) => {
				title.setTitle(text ? `${text} · Pluto` : 'Pluto')
			})
	}

	override updateTitle(snapshot: RouterStateSnapshot): void {
		this.key$.next(this.buildTitle(snapshot))
	}
}
