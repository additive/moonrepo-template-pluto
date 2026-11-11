import { regex } from 'arkregex'
import { type } from 'arktype'

export const SOME_REGEX = regex('[a-zA-Z -/&+]+')

/** Example of a validated custom value, see `yourValueHere` below. */
export const BrandedValue = type(SOME_REGEX).brand('BV')

/** The `project` block of a `moon.yml`, as the app reads it at build time. */
export const MoonProject = type({
	/** The project's display name. Optional in moon, required here. */
	title: 'string',
	/** What the project is. */
	description: 'string',
	/** The team's messaging channel. */
	'channel?': '/^#/',
	/** moon keeps unknown keys of `project` as metadata. Add your own like this one. */
	yourValueHere: BrandedValue,
})
export type MoonProject = typeof MoonProject.infer

/** The parts of a `moon.yml` this lib validates. */
export const MoonConfig = type({
	project: MoonProject,
})
export type MoonConfig = typeof MoonConfig.infer
