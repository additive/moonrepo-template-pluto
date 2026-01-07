/** biome-ignore-all lint/suspicious/noConsole: fine for build scripts */

import process from 'node:process'
import type { Plugin } from 'esbuild'

import globalValues from './global-values'

export default {
	name: 'app-build-define',
	setup: ({ initialOptions }) => {
		for (const [key, value] of Object.entries(globalValues)) {
			console.debug(`[D] ${key}:`, value)

			initialOptions.define ??= {} // idk
			initialOptions.define[key] = JSON.stringify(value)

			process.env[key] = value
		}
	},
} satisfies Plugin
