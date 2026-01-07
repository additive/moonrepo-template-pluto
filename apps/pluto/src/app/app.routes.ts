import type { Routes } from '@angular/router'

export default [
	{
		path: '',
		redirectTo: 'pluto',
		pathMatch: 'full',
	},
	{
		path: 'pluto',
		loadComponent: () => import('@pluto/layout/pluto/pluto.feature').then((m) => m.PlutoFeature),
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'settings',
				loadChildren: () => import('@pluto-feature/settings/settings-routes'),
			},
			{
				path: 'dashboard',
				loadChildren: () => import('@pluto/pluto/app/features/dashboard/dashboard-routes'),
			},
			{
				path: 'process-planer',
				loadChildren: () =>
					import('@pluto/pluto/app/features/process-planer/process-planer-routes'),
			},
			{
				path: 'position-board',
				loadChildren: () =>
					import('@pluto/pluto/app/features/position-board/position-board-routes'),
			},
			{
				path: 'ad-hoc-report',
				loadChildren: () => import('@pluto-feature/ad-hoc-report/ad-hoc-report-routes'),
			},
			{
				path: 'dyn-report',
				loadChildren: () => import('@pluto-feature/dyn-report/dyn-report-routes'),
			},
			{
				path: 'spc-live-view',
				loadChildren: () => import('@pluto-feature/spc-live-view/spc-live-view-routes'),
			},
		],
	},
	{
		path: 'ui',
		title: 'User Interface',
		loadComponent: () =>
			import('@pluto/user-interface/app/app.component').then((c) => c.AppComponent),
		loadChildren: () => import('@pluto/user-interface/app/app.routes'),
		menu: {
			in: 'user',
		},
	},
	{
		path: 'page-not-found',
		title: 'Page Not Found',
		loadComponent: () =>
			import('@pluto-feature/not-found/not-found.feature').then((m) => m.NotFoundFeature),
	},
	{
		path: '**',
		redirectTo: '/page-not-found',
		pathMatch: 'full',
	},
] satisfies Routes
