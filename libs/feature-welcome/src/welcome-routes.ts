import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		title: 'route.welcome',
		loadComponent: () => import('./welcome.component').then((m) => m.WelcomeFeature),
		menu: {
			priority: -1,
		},
	},
] satisfies Routes
