import ng from 'angular-eslint'
import { defineConfig } from 'eslint/config'
import rxjs from 'eslint-plugin-rxjs-x'
import globals from 'globals'

// BUG: ngrx not compatible with latest eslint: https://github.com/ngrx/platform/issues/4993

const plugin = defineConfig([
	{
		files: ['**/*.ts'],
		extends: [...ng.configs.tsAll, /* ...ngrx.configs.signals, */ rxjs.configs.recommended],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			// TypeScript
			'@typescript-eslint/unbound-method': [
				'error',
				{
					// TODO: Check with new Angular signal forms if that is something we can disallow
					ignoreStatic: true, // Angular validator functions for example
				},
			],
			// Angular
			'@angular-eslint/no-experimental': 'off', // Hmm, yes!
			'@angular-eslint/use-injectable-provided-in': 'off', // weird recommendation
			'@angular-eslint/directive-class-suffix': 'error', // No longer recommended by Angular
			'@angular-eslint/component-class-suffix': [
				// No longer recommended by Angular
				'error',
				{
					suffixes: ['Component', 'Feature'],
				},
			],
			'@angular-eslint/sort-keys-in-type-decorator': [
				'error',
				{
					Component: [
						'exportAs',
						'selector',
						'templateUrl',
						'template',
						'styleUrl',
						'styleUrls',
						'styles',
						'encapsulation',
						'changeDetection',
						'imports',
						'hostDirectives',
						'viewProviders',
					],
				},
			],
		},
	},
	{
		files: ['**/*.html'],
		extends: [...ng.configs.templateRecommended, ...ng.configs.templateAccessibility],
		rules: {
			'@angular-eslint/template/prefer-control-flow': 'error',
			'@angular-eslint/template/prefer-self-closing-tags': 'error',
			'@angular-eslint/template/no-duplicate-attributes': 'error',
			'@angular-eslint/template/attributes-order': 'error',
			'@angular-eslint/template/use-track-by-function': 'error',
			'@angular-eslint/template/click-events-have-key-events': 'off', // please no
			'@angular-eslint/template/label-has-associated-control': 'off', // it has through input wrapping
			'@angular-eslint/template/cyclomatic-complexity': [
				'warn',
				{
					maxComplexity: 8,
				},
			],
		},
	},
])

export default plugin
