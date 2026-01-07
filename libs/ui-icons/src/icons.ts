import { assertInInjectionContext, inject } from '@angular/core'
import type { IconLookup, IconPack, IconPrefix } from '@fortawesome/angular-fontawesome'

import { ICONS } from './icons-token'

/**
 * All icon prefixes we supports.
 * @see {@link IconPrefix}
 */
export const iconPrefixes = ['fab', 'far', 'fak'] as const

/**
 * Gives all possible icons we support back in a single array.
 * Supports selection of just icons by prefix.
 */
export const useIcons = (
	prefix?: Extract<IconPrefix, (typeof iconPrefixes)[number]>,
): IconLookup[] => {
	assertInInjectionContext(useIcons)

	const icons = inject(ICONS).value

	if (prefix) {
		return icons.filter((icon) => icon.prefix === prefix)
	}

	return icons
}

/**
 * Returns unique list of icons from all available packs.
 */
export function getIconsFromPacks(packs: IconPack[]): IconLookup[] {
	return packs
		.flatMap((pack): IconLookup[] => {
			return Object.values(pack).map(({ iconName, prefix }) => ({ iconName, prefix }))
		})
		.reduce<IconLookup[]>((accumulator, l) => {
			if (!accumulator.some((index) => index.iconName === l.iconName)) {
				accumulator.push(l)
			}
			return accumulator
		}, [])
}
