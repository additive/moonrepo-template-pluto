import { defineConfig } from 'eslint/config'

import pluto from '@pluto/eslint-plugin'

export default defineConfig(
	...pluto.configs.base,
	...pluto.configs.ts,
	...pluto.configs.angular,
)
