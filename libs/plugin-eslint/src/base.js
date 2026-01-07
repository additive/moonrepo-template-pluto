import { defineConfig, globalIgnores } from 'eslint/config'
import compat from 'eslint-plugin-compat'
import globals from 'globals'

const plugin = defineConfig([
	globalIgnores([
		'**/.angular/',
		'**/.git/',
		'**/.proto/',
		'**/.cache/',
		'**/dist/',
		'**/node_modules/',
		'*.{json,yml,yaml,toml}',
	]),
	compat.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.builtin,
				...globals.es2022,
			},
		},
	},
])

export default plugin
