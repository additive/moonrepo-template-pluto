import { HttpClient } from '@angular/common/http'
import {
	type EnvironmentProviders,
	Injectable,
	inject,
	isDevMode,
	makeEnvironmentProviders,
} from '@angular/core'
import { TitleStrategy } from '@angular/router'
import {
	getBrowserLang,
	provideTransloco,
	type Translation,
	type TranslocoLoader,
} from '@jsverse/transloco'
import type { Observable } from 'rxjs'

import { Language } from './language'
import { TranslatedTitleStrategy } from './title-strategy'

/** Loads `/locales/<lang>.json`, which the build copies from this lib's `locales/`. */
@Injectable({ providedIn: 'root' })
class LocaleLoader implements TranslocoLoader {
	private readonly http = inject(HttpClient)

	getTranslation(lang: string): Observable<Translation> {
		return this.http.get<Translation>(`/locales/${lang}.json`)
	}
}

/**
 * Sets up transloco for an app: the shared locale files, in the browser's language when
 * the app ships it, in English otherwise. Route titles become translation keys.
 */
export function provideI18n(): EnvironmentProviders {
	const languages: string[] = Object.values(Language)
	const browser = getBrowserLang() ?? ''

	return makeEnvironmentProviders([
		{ provide: TitleStrategy, useClass: TranslatedTitleStrategy },
		provideTransloco({
			config: {
				availableLangs: languages,
				defaultLang: languages.includes(browser) ? browser : Language.English,
				fallbackLang: Language.English,
				reRenderOnLangChange: true,
				prodMode: !isDevMode(),
			},
			loader: LocaleLoader,
		}),
	])
}
