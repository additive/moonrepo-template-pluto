import { defineConfig } from 'eslint/config'
import biome from 'eslint-config-biome'
import tsdoc from 'eslint-plugin-tsdoc'
import ts from 'typescript-eslint'

const plugin = defineConfig([
	{
		files: ['**/*.ts'],
		extends: [...ts.configs.strictTypeChecked, ...ts.configs.stylisticTypeChecked],
		plugins: {
			tsdoc,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			'tsdoc/syntax': 'error',
			// Allow certain types to be casted to strings in template expressions
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowAny: false,
					allowBoolean: true,
					allowNever: false,
					allowNullish: true,
					allowNumber: true,
					allowRegExp: false,
				},
			],
			// This rule is kinda stupid as when you want to infer intentionally
			'@typescript-eslint/no-unnecessary-type-parameters': 'off',
			// Rules not yet disabled by eslint-config-biome
			'@typescript-eslint/consistent-type-definitions': 'off',
		},
	},
	biome,
])

export default plugin
