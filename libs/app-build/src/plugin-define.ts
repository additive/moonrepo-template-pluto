import type { Plugin } from 'esbuild'
import process from 'node:process'

import globalValues from './global-values'

export default {
	name: 'app-build-define',
	setup: ({ initialOptions }) => {
		for (const [key, value] of Object.entries(globalValues)) {
			console.debug(`[D] ${key}:`, value)

			initialOptions.define ??= {}
			initialOptions.define[key] = JSON.stringify(value)

			process.env[key] = value
		}
	},
} satisfies Plugin
