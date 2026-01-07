import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		title: 'Example',
		loadComponent: () => import('./example.feature').then((m) => m.ExampleFeature),
		menu: {},
	},
] satisfies Routes
