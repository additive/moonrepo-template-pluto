import { regex } from 'arkregex'
import { type } from 'arktype'

export const SOME_REGEX = regex('[a-zA-Z -/&+]+')

export const BrandedValue = type(SOME_REGEX).brand('BV')

const MoonProjectMetadata = type({
	/**
	 * Extend metadata by your needs
	 */
	yourValueHere: BrandedValue,
})

export const MoonProject = type({
	/**
	 * The projects application name. Moon has it optional, we
	 * define it as required.
	 */
	name: 'string',
	/**
	 * The projects description.
	 */
	description: 'string',
	/**
	 * The messaging channel in our Microsoft Teams.
	 */
	'channel?': '/^#/',
	/**
	 * Extended Moon metadata to be compatible with their api.
	 */
	metadata: MoonProjectMetadata,
})
export type MoonProject = typeof MoonProject.infer

export const MoonConfig = type({
	project: MoonProject,
})
export type MoonConfig = typeof MoonConfig.infer
