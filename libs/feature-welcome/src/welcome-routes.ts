import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		title: 'Welcome',
		loadComponent: () => import('./welcome.feature').then((m) => m.WelcomeFeature),
		menu: {},
	},
] satisfies Routes
