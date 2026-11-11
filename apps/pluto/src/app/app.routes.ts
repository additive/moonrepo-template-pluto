import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		redirectTo: 'pluto',
		pathMatch: 'full',
	},
	{
		path: 'pluto',
		loadComponent: () =>
			import('@pluto/layout/main/main.component').then((m) => m.MainFeature),
		children: [
			{
				path: '',
				redirectTo: 'welcome',
				pathMatch: 'full',
			},
			{
				path: 'welcome',
				loadChildren: () => import('@pluto-feature/welcome/welcome-routes'),
			},
			{
				path: 'example',
				loadChildren: () => import('@pluto-feature/example/example-routes'),
			},
		],
	},
	{
		path: 'page-not-found',
		title: 'route.not-found',
		loadComponent: () =>
			import('@pluto-feature/not-found/not-found.component').then((m) => m.NotFoundFeature),
	},
	{
		path: '**',
		redirectTo: '/page-not-found',
		pathMatch: 'full',
	},
] satisfies Routes
