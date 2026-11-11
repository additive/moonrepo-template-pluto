import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		title: 'route.example',
		loadComponent: () => import('./example.component').then((m) => m.ExampleFeature),
		menu: {},
	},
] satisfies Routes
