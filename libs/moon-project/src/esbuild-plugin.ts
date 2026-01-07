import type { Plugin } from 'esbuild'

import { getMoonConfig } from './moon'

export default {
	name: 'app-moon-project',
	setup: ({ initialOptions }) => {
		initialOptions.define ??= {}

		const projectMoon = getMoonConfig('./')

		initialOptions.define.MOON_PROJECT_JSON = JSON.stringify(projectMoon.project)
	},
} satisfies Plugin
