import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		title: 'HTTP Example',
		loadComponent: () => import('./example.feature').then((m) => m.ExampleFeature),
		menu: {},
	},
] satisfies Routes
