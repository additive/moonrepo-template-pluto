import { type EnvironmentProviders, inject, provideAppInitializer } from '@angular/core'
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome'

import { getIconsFromPacks } from './icons'
import { ICONS } from './icons-token'

export function provideIcons(): EnvironmentProviders {
	return provideAppInitializer(async () => {
		const library = inject(FaIconLibrary)
		const config = inject(FaConfig)
		const icons = inject(ICONS)

		config.defaultPrefix = 'far'
		config.fixedWidth = true

		const { far } = await import('@fortawesome/free-regular-svg-icons')

		library.addIconPacks(far)

		icons.next(getIconsFromPacks([far]))
	})
}
